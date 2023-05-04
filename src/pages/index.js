import Head from 'next/head'
import { useEffect, useState } from 'react'
import anime from "animejs"
import { Container, Typography, Box, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Home() {
  const [action, setAction] = useState("Welcome :)");

  useEffect(() => {
    let animation = anime.timeline({
      easing: 'linear',
      loop: true
    });

    // scale heart up
    animation.add({
      targets: '#heart',
      scale: 2,
      duration: 3000,
      fill: '#FF0000',
      changeBegin: function() {
        setAction("Breathe IN")
      },
    })

    // scale heart down
    animation.add({
      targets: '#heart',
      scale: 1,
      duration: 12000,
      fill: '#33CC33',
      changeBegin: function() {
        setAction("Breathe OUT")
      },
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
          <Box>
            <Typography variant='h4'>{action}</Typography>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
