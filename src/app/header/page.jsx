'use client'
import { Box } from "@mui/material"
import Link from "next/link"

export default function UP(){
    return (
    <Box
      height = "10vh"
      display='flex'
      width="100vw"
      justifyContent='center'
      alignItems="center"
      bgcolor="#462"
      gap={5}
     >
      <Link href="./">Tic Tac Tow</Link>
      <Link href="./hangman">HangMan</Link>
      {/*<Link href="./snake">Snake</Link>*/}
     </Box>
    )
}