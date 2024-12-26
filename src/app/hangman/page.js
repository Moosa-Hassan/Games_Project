'use client'

import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from 'react';

export default function Hangman() {
    const [alphabets, setAlphabets] = useState([]);
    const [word, setWord] = useState(null);
    const [incorrectGuess, setIncorrectGuess] = useState(0);
    const [clicked, setClicked] = useState(Array(26).fill(false));

    const fill = async () => {
        const alphabetArray = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'
        ];
        setAlphabets(alphabetArray);
    };

    useEffect(() => {
        fill();
        getWord();
    }, []);

    const getWord = async () => {
        try {
            const response = await fetch('/words.json');
            const data = await response.json();
            const index = Math.floor(Math.random() * data.words.length);
            setWord(data.words[index].toUpperCase());
        } catch (error) {
            console.error('Error fetching word:', error);
        }
    };

    const len = word ? word.length : 0;
    const [displayWords, setDisplayWords] = useState(Array(len).fill('_'));

    useEffect(() => {
        setDisplayWords(Array(len).fill('_'));
    }, [word]);

    useEffect(() => {
        if (displayWords.length > 0 && !displayWords.includes('_')) {
            alert("Congratulations! You've won the game!");
        }
    }, [displayWords])

    const display = () => displayWords.join(' ');

    const handleReset = async () => {
        fill();
        await getWord();
        setIncorrectGuess(0);
        setClicked(Array(26).fill(false));
    };

    const hangmanStages = [
        `\n +---+\n |   |\n     |\n     |\n     |\n     |\n=========`,
        `\n +---+\n |   |\n O   |\n     |\n     |\n     |\n=========`,
        `\n +---+\n |   |\n O   |\n |   |\n     |\n     |\n=========`,
        `\n +---+\n |   |\n O   |\n/|   |\n     |\n     |\n=========`,
        `\n +---+\n |   |\n O   |\n/|\\  |\n     |\n     |\n=========`,
        `\n +---+\n |   |\n O   |\n/|\\  |\n/    |\n     |\n=========`,
        `\n +---+\n |   |\n O   |\n/|\\  |\n/ \\  |\n     |\n=========`,
    ];

    const getHangmanDrawing = () => hangmanStages[incorrectGuess] || '';


    const handleClick = (index) => {
        const letter = alphabets[index];
        if (clicked[index]) return;

        const updatedClicked = [...clicked];
        updatedClicked[index] = true;
        setClicked(updatedClicked);

        if (word.includes(letter)) {
            const newDisplay = [...displayWords];
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    newDisplay[i] = letter;
                }
            }
            setDisplayWords(newDisplay);
        } 
        else {
            setIncorrectGuess((prev) => {
                const newIncorrectGuess = prev + 1;
                if (newIncorrectGuess === 7) {
                    alert(`The man is hanged. The word was ${word}. Press reset to play a new game.`);
                }
                return newIncorrectGuess;
            });
        }
        
    };

    return (
        <Box
            sx={{
                bgcolor: "#566",
                width: "100vw",
                minHeight: "100vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: { xs: 2, md: 5 }
            }}
        >
            <Box
                sx={{
                    bgcolor: '#257',
                    width: { xs: '90%', md: '65%' },
                    maxWidth: '800px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', md: '40%' },
                        fontSize: { xs: '24px', md: '40px' },
                        textAlign: 'center'
                    }}
                >
                    <pre>{getHangmanDrawing()}</pre>
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', md: '60%' },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            border: "2px solid #000",
                            textAlign: 'center',
                            fontSize: { xs: '16px', md: '20px' },
                            p: 1,
                            mb: 2,
                        }}
                    >
                        {display()}
                    </Box>
                    <Grid container spacing={1}>
                        {alphabets.map((letter, index) => (
                            <Grid item xs={3} sm={2} md={1.5} key={letter}>
                                <Box
                                    sx={{
                                        aspectRatio: '1',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid #000',
                                        bgcolor: clicked[index] ? '#257' : '#257',
                                        color: clicked[index] ? '#257' : '#000',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleClick(index)}
                                >
                                    {letter}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
                        Reset
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
