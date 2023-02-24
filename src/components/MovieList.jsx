import React from 'react'
import MovieCard from './MovieCard'
import {useSelector} from 'react-redux'
import styles from './MovieList.module.css'

const MovieList = () => {
    const movies = useSelector((state) => state.movie.movies)

    const movieDisplay = movies.map((movie) => {
        <MovieCard poster={movie.poster_path}/>
    })

  return (
    <div className={styles.movies}>{movieDisplay}</div>
  )
}

export default MovieList