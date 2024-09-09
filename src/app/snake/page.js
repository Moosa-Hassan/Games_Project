"use client"

import { Box , Grid} from "@mui/material"


export default function snake(){
    const check = (index)=>{
        if ((index%2) === 0){
            return true
        }
        return false
    }
    return (
        <Box display = "flex" justifyContent={'center'} alignItems={'center'}>
            <Box
                height ="100vh"
                width = "70%"
                display = "flex"
                justifyContent="center"
                alignItems="center"
                border={"10px solid #000"}
                padding = "5px"
            >
                <Grid
                container spacing={0}
                >
                {Array.from({length:96}).map((_,index)=>
                    (
                    <Grid item xs={1} key={index}>
                        <Box                  
                        width="100%"
                        height="0"
                        paddingTop="100%" // This maintains a square aspect ratio
                        position="relative"
                        display ="flex"
                        alignItems='center'
                        textAlign='center'
                        justifyContent='center'
                        border="1px solid #000"
                        onClick ={()=>handleClicked(index) }
                        sx={{
                            lineHeight:"30px",
                            backgroundColor: check(index) ? "#fff" : "#ccc",
                        }}
                        >
                        <Box position='absolute' 
                        top="40%"
                        left="28%"
                        transform="translate(-50%, -50%)" 
                        fontSize={'15px'}
                        
                        >
                            {index}
                        </Box>
                        </Box>
                    </Grid>
                    )
                )}
                </Grid>
            </Box>
        </Box>
    )
}