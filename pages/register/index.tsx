import React from 'react'
import { NextPage } from 'next'
import Register from '../../src/modules/Register'
import Layout from '../../src/common/Layout'

const RegisterPage: NextPage = () => {
  return (
    <Layout>
      <Register />
    </Layout>
  )
}

export default RegisterPage
