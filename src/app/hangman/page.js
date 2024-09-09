'use client'

import { Box ,Button,Grid} from "@mui/material"
import { useEffect, useState } from 'react';




export default function Hangman(){
    const [alphabets, setAlphabets] = useState([]);
    const [word, setWord] = useState(null);
    const [incorrectGuess, setIncorrectGuess] = useState(0);
    const [clicked,setClicked] = useState(Array(26).fill(false));

    const fill = async()=>{
        
        const alphabetArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
];
        setAlphabets(alphabetArray);
    }
    
    const Change = (letter) => {
        const index = alphabets.indexOf(letter);
        if (index >= 0) {
            let change = [...clicked];
            change[index] = true;
            setClicked(change);
        }
    };
    useEffect((letter) => {
        Change(letter)
        
    }, [clicked]);

    useEffect(() => {
        fill();
        getWord();
        
    }, []);

    const getWord = async () => {
        try {
            const response = await fetch('/words.json');
            const data = await response.json();
            let index = Math.floor(Math.random() * data.words.length);
            console.log(index);
            console.log(data.words[index]);
            setWord(data.words[index].toUpperCase());
        } catch (error) {
            console.error('Error fetching word:', error);
        }
    };
   
    let len = word ? word.length : 0;

    const [displayWords, setDisplayWords] = useState(Array(len).fill('_'));
    
    useEffect(() => {
        setDisplayWords(Array(len).fill('_'));
    }, [word]);

    const display = () => {
        return displayWords.join(' ');
    };

    const handleReset = async () => {
        fill(); // Re-initialize alphabets
        await getWord(); // Fetch new word
        setIncorrectGuess(0); // Reset incorrect guesses
        setClicked(Array(26).fill(false)); // Reset clicked state
    };

    const hangmanStages = [
    `
     +---+
     |   |
         |
         |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
         |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
     |   |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|   |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|\\  |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|\\  |
    /    |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|\\  |
    / \\  |
         |
    =========`,
    `
     +---+
         |
     O   |
    /|\\  |
    / \\  |
         |
    =========`
];

    
    const getHangmanDrawing = () => {
        return hangmanStages[incorrectGuess] || '';
    };

    const checkWin = () => {
        if (!displayWords.includes('_')) {
            alert("Congratulations! You've won the game!");
        }
    };
    


    const handleClick = (index) => {
        const letter = alphabets[index];
        if (clicked[index]) return; // Prevent multiple clicks

        // Update the clicked state
        const updatedClicked = [...clicked];
        updatedClicked[index] = true;
        setClicked(updatedClicked);

        // Check if the letter is in the word
        if (word.includes(letter)) {
            const newDisplay = [...displayWords];
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    newDisplay[i] = letter;
                }
            }
            setDisplayWords(newDisplay);
        } else {
            setIncorrectGuess(prev => {
                const newIncorrectGuess = prev + 1;
                if (newIncorrectGuess === 7) {
                    alert(`The man is hanged. The word was ${word}. Press reset to play a new game.`);
                }
                return newIncorrectGuess;
            });
        }
        checkWin()
    };


    return (
        <Box
            bgcolor="#566"
            width ="100vw"
            display='flex'
            justifyContent='center'
            alignItems='center'
            height="100vh"
        >
            <Box
                bgcolor='#257'
                height ="425px"
                width ='65%'
                display='flex'
                flexDirection={'row'}
                justifyContent='center'
                alignItems='center'
                
            >
                <Box height ="100%" width = "40%" fontSize='40px'><pre>{getHangmanDrawing()}</pre></Box>
                <Box height ="100%" width = "60%" gap={2}>
                    <Box height ="15%" width = "100%" border="2px solid #000" display='flex'justifyContent='center' alignItems='center' fontSize={'20px'}>{display()}</Box>
                    <Grid
                        container spacing={2}
                        >
                        {alphabets.map((letter,index)=>
                            (
                            <Grid item xs={1.7} key={letter}>
                              <Box                  
                                width="100%"
                                height=""
                                paddingTop="100%" // This maintains a square aspect ratio
                                position="relative"
                                display ="flex"
                                alignItems='center'
                                textAlign='center'
                                justifyContent='center'
                                border="1px solid #000"  
                                onClick={()=>handleClick(index)}   
                                sx={{ color: clicked[index] ? '#257' : '#000', }}                          
                                >
                                <Box
                                    position='absolute' 
                                    top="30%"
                                    left="40%"
                                    transform="translate(-50%, -50%)"
                                >
                                   {letter}
                                </Box>
                                </Box>
                            </Grid>
                            ))}
                            <Button variant="text" onClick={handleReset}>Reset</Button>
                        </Grid>                        
                </Box>               
            </Box>
        </Box>
    )
}
