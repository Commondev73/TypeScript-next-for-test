import React from 'react'
import { NextPage } from 'next'
import Profile from '../../src/modules/Profile'
import Layout from '../../src/common/Layout'

const ProfilePage: NextPage = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  )
}

export default ProfilePage
