import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { profileActions } from '../store/redux slices/profile'
import TopTenList from '../components/TopTenList'


const ProfileScreen = () => {
  return (
    <div>
      <Header />
      <div className='profile-page'>
        <p>Hello</p>
      </div>
      <Footer />
    </div>
  )
}

export default ProfileScreen