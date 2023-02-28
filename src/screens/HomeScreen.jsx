import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { movieActions } from "../store/redux slices/movie";
import Header from "../components/Header";
import Footer from '../components/Footer'
import MovieList from '../components/MovieList'
import axios from 'axios'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.movie.page)

  const getPopular = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=ab914da83ff50db0baf3acd601780e5f&language=en-US&page=${page}`)
      .then((res) => {
        console.log(res.data.results)
        dispatch(movieActions.popular(res.data.results))
        window.scrollTo(0, 0)
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
          console.log('error', err.message)
      }
      })
  }

  // Page functions
  const nextPage = () => {
    dispatch(movieActions.pageUp())
  }

  const prevPage = () => {
    dispatch(movieActions.pageDown())
  }

  useEffect(() => {
    getPopular()
    console.log(page)
  }, [page])


  return (
    <div>
      <Header />
      <div className='home-page'>
        <h2>Most Popular</h2>
        <MovieList />
        <div className='prevnext'>
          <button onClick={page !== 1 ? prevPage : undefined}>Prev</button>
          <p>{page}</p>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
