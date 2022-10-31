import React from 'react'
import { NextPage } from 'next'
import Login from '../src/modules/Login'
import Layout from '../src/common/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export default Home
