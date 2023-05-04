import Head from 'next/head'
import { useEffect } from 'react'
import anime from "animejs"

export default function Home() {
  useEffect(() => {
    anime({
      targets: 'body',
      translateX: 250,
      rotate: '1turn',
      backgroundColor: '#CCC',
      duration: 800
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
    </>
  )
}
