import React, {useEffect, useContext, useCallback} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { profileActions } from '../store/redux slices/profile'
import TopTenList from '../components/TopTenList'
import AuthInitialContext from '../store/AuthContext'


const ProfileScreen = () => {
  const {userId} = useContext(AuthInitialContext)
  const dispatch = useDispatch()

  const getTopTen = () => {
    axios
      .get(`/profile/${userId}`)
      .then((res) => {
        console.log(res.data)
        dispatch(profileActions.topTen(res.data))
      })
      .catch((err) => {
        if (err.response) {
          console.log('Client received error in response')
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
      } else if (err.request) { 
          console.log('Client never received response')
          console.log(err.request)
      } else { 
          // Anything else
          console.log('ERROR', err.message)
      }
      })
  }

  useEffect(() => {
    getTopTen()
  }, [])

  return (
    <div>
      <Header />
      <div className='profile-page'>
        <TopTenList />
      </div>
      <Footer />
    </div>
  )
}

export default ProfileScreen