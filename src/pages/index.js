import Head from 'next/head'
import { useEffect } from 'react'
import anime from "animejs"
import { Container, Typography, Box, Paper } from '@mui/material';

export default function Home() {
  useEffect(() => {
    anime({
      targets: 'hello',
      translateX: 250,
      rotate: '1turn',
      backgroundColor: '#CCC',
      duration: 5000
    });

  }, [])

  return (
    <>
      <Head>
        <title>Clear Mind</title>
        <meta name="description" content="Prana Breath for begginners" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm">
        <Box sx={
          {
            display:'flex',
            flexDirection: 'column',
            p:1,
            m:1,
            borderRadius:1,
          }}>

          <Typography id='hello' variant='h1'>Clear Mind</Typography>
          <Box>
            <Paper>
              p1
            </Paper>
          </Box>

          <Box sx={{marginTop:1}}>
            <Paper>p2</Paper>
          </Box>
        </Box>
      </Container>
    </>
  )
}
