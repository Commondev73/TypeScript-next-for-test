/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, ComponentType } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { isEmpty } from 'lodash'
import Auth from '../auth'

interface Props {
  profile?: {
    userId: string
    userName: string
    firstName: string
    lastName: string
    status: string
    photo?: string
  }  | {}
}

const WithUserLogin = (Component: ComponentType<Props>) => {
  const token = Auth.getToken()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (token && isEmpty(profile)) {
      getProfile()
    }
  })

  const getProfile = () => {
    const decoded = jwtDecode<JwtPayload>(token)
    delete decoded.iat
    delete decoded.exp
    if (!isEmpty(decoded)) {
      setProfile(decoded)
    }
  }

  const resetProfile = () => {
    setProfile({})
  }

  const ComponentUserLogin = () => {
    return <Component profile={profile} />
  }

  return ComponentUserLogin
}

export default WithUserLogin
