import React, { FunctionComponent } from 'react'
import Head from 'next/head'

const Header: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>TEST</title>
        <base href="/" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="content-language" content="th, en" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="all" />
        <meta name="description" content="" />
        <meta name="keyword" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default Header
