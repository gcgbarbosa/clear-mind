import Head from 'next/head'
import { useEffect } from 'react'
import anime from "animejs"
import { Container, Typography, Box, Paper, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Home() {
  useEffect(() => {
    anime({
      targets: '#heart',
      easing: 'linear',
      keyframes: [
        {value: 0, scale: 2, duration: 3000, fill: '#FF0000'},
        {value: 3000, scale: 1, duration: 12000, fill: '#33CC33'},
      ],
      loop: true
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
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Box>
            <Typography variant='h1'>Clear Mind</Typography>
          </Box>
          <Box>
            <FavoriteIcon id="heart" sx={{ fontSize: 100, fill:"#33CC33" }}   />
          </Box>
        </Stack>
      </Container>
    </>
  )
}
