import React from 'react'
import Auth from '../components/Auth'
import styles from './AuthScreen.module.css'

const AuthScreen = () => {

  return (
    <div className={styles.page}>
      <Auth />
    </div>
  )
}

export default AuthScreen