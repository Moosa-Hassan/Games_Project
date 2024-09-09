'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box,Grid, Button } from '@mui/material';
import {useState} from 'react';




export default function Home() {
  
    const [clicked,setclicked] = useState(Array(9).fill(null));
    const [turn,setTurn] =useState('O')
    

      const winCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    
      const won = (board) => {
        for (const [a, b, c] of winCombo) {
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }
        return '';
      };

    const handleClicked =(index) =>{
      if (clicked[index] === null ){
        const newclick = [...clicked];
        newclick[index] = turn;
        setclicked(newclick);
        
        const Winner = won(newclick);
        if (Winner) {
          
          alert(`Winner: ${Winner}. Press reset to play a new game.`);
        } else {
          setTurn(turn === 'O' ? 'X' : 'O');
        }
      }
    }

    const handleReset = ()=>{
      setclicked(Array(9).fill(null))
   
    }


  return (
    
    <Box
      width = "100vw"
      bgcolor = "#aaa"
      display={'flex'}
      justifyContent='center'
      alignItems='center'
      flexDirection={'column'}
      gap="10px"
    >
     
     <Box width = "40%" height ="88%" bgcolor="#fff" display="flex" flexDirection="column" >
        <Grid
         container spacing={2}
        >
          {Array.from({length:9}).map((_,index)=>
            (
              <Grid item xs={4} key={index}>
                <Box                  
                  width="100%"
                  height="0"
                  paddingTop="100%" // This maintains a square aspect ratio
                  position="relative"
                  display ="flex"
                  bgcolor="#eee"
                  alignItems='center'
                  textAlign='center'
                  justifyContent='center'
                  border="1px solid #000"
                  onClick ={()=>handleClicked(index) }
                  sx={{lineHeight:"30px",}}
                >
                  <Box position='absolute' 
                  top="40%"
                  left="28%"
                  transform="translate(-50%, -50%)" 
                   fontSize={'100px'}
                   
                   >
                    {clicked[index]}</Box>
                </Box>
              </Grid>
            )
          )}
        </Grid>
     </Box>
     <Button variant="contained" size="large" onClick={handleReset}>Reset</Button>
    </Box>
  );
}
