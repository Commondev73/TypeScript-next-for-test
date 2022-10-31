import axios from 'axios'
import { AuthClient } from '../axiosInterceptors'
import { EndpointConst } from '../constants'
import { ISignUp, ISingIn, IUpdate } from '../types/user'

const signUp = async (payload: ISignUp) => {
  return await axios.post(EndpointConst.AUTH.SIGN_UP, payload)
}

const signIn = async (payload: ISingIn) => {
  return await axios.post(EndpointConst.AUTH.SIGN_IN, payload)
}

const refreshToken = async (refreshToken: string) => {
  return await axios.get(EndpointConst.AUTH.REFRESH_TOKEN, {
    headers: {
      Authorization: refreshToken
    }
  })
}

const getProfile = async () => {
  return await AuthClient.get(EndpointConst.AUTH.GET_PROFILE)
}

const updateProfile = async (payload: IUpdate) => {
  return await AuthClient.post(EndpointConst.AUTH.UPDATE_PROFILE, payload)
}

export { signUp, signIn, refreshToken, getProfile, updateProfile }
