/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import personImage from '../../assets/images/person.png'
import WithUserLogin from '../../hoc/WithUserLogin'
import Auth from '../../auth'
import styles from './Navigation.module.scss'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { Navbar, Container, Dropdown } from 'react-bootstrap'
import { EndpointConst } from '../../constants'

const Navigation = (props) => {
  const router = useRouter()

  const logout = () => {
    Auth.removeToken()
    router.reload('/')
  }

  const ImagePreview = () => {
    return props.profile.photo ? `${EndpointConst.AUTH.GET_PHOTO}/${props.profile.photo}` : personImage.src
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand className={styles.navigationBrand}>
            <span className="ms-2 tex">FOR TEST</span>
          </Navbar.Brand>
        </Link>
        <div className="justify-content-end">
          {!isEmpty(props.profile) ? (
            <Dropdown>
              <Dropdown.Toggle id="topbar-dropdown" as="div" className={styles.navigationProfile}>
                <div className={styles.navigationProfileImage}>
                  <img src={ImagePreview()} alt="avatar"/>
                </div>
                <span>{props.profile.firstName}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/user/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link href="/register">Register</Link>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default WithUserLogin(Navigation)
