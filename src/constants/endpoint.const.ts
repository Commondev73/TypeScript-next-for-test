const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const EndpointConst = {
  AUTH: {
    SIGN_UP: `${baseUrl}/api/auth/sign-up`,
    SIGN_IN: `${baseUrl}/api/auth/sign-in`,
    REFRESH_TOKEN: `${baseUrl}/api/auth/refresh-token`,
    GET_PROFILE: `${baseUrl}/api/auth/profile`,
    GET_PHOTO: `${baseUrl}/api/upload`,
    UPDATE_PROFILE: `${baseUrl}/api/auth/update-profile`
  },
}
