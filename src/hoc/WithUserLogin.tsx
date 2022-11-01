import React, { useState, useEffect, ComponentType } from 'react'
import Auth from '../auth'
import jwtDecode from 'jwt-decode'
import { isEmpty } from 'lodash'
import { IUserJwtPayload } from '../types/user'

interface WithUserLoginProps {
  profile: IUserJwtPayload
}

const WithUserLogin = <P,>(Component: ComponentType<P & WithUserLoginProps>) => {
  const ComponentUserLogin = (props: P) => {
    const token = Auth.getToken()
    const [profile, setProfile] = useState<IUserJwtPayload>({})

    useEffect(() => {
      if (token && isEmpty(profile)) {
        getProfile()
      }
    })

    const getProfile = () => {
      const decoded = jwtDecode<IUserJwtPayload>(token)
      delete decoded.iat
      delete decoded.exp
      if (!isEmpty(decoded)) {
        setProfile(decoded)
      }
    }

    const resetProfile = () => {
      setProfile({})
    }
    return <Component {...props} profile={profile} />
  }

  return ComponentUserLogin
}

export default WithUserLogin
