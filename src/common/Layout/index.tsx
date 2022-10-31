import React, { FunctionComponent, ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Navigation from '../Navigation'

interface Props {
  children?: ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </>
  )
}

export default Layout
