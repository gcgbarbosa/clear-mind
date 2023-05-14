import Head from 'next/head'
import { useEffect, useState } from 'react'
import anime from "animejs"
import { Container, Typography, Box, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import * as Tone from 'tone'


export default function Home() {

  const [action, setAction] = useState("Welcome :)");

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.start();

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
        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease("C4", '8n', Tone.Transport.now());
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
        synth.triggerAttackRelease("E4", '8n', Tone.Transport.now());
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
            <Typography variant='h2'>Clear Mind</Typography>
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
