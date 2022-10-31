import React, { FunctionComponent } from 'react'
import styles from './Footer.module.scss'

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.footer}>
      <p>© 2022 Copyright: TEST</p>
    </div>
  )
}

export default Footer
