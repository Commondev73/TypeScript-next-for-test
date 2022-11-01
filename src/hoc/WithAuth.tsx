import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext, GetServerSideProps } from 'next'

const RequireAuthentication = (gssp: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
  const token = ctx.req.cookies.token
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  return await gssp(ctx)
}

export default RequireAuthentication
