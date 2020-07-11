import React from 'react';
import Head from 'next/head';
import Home from './home';

export default () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>Musyn</title>
      <meta name="description" content="Write music together, in real-time" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <link rel="stylesheet" href="/build/css/styles.css" />
      <script src="https://kit.fontawesome.com/a2c22431f0.js" crossOrigin="anonymous" async />
    </Head>
    <Home />
  </>
);
