import React from 'react'
import styles from './MovieCard.module.css'

const MovieCard = ({poster, title}) => {
  return (
    <div className={styles['movie-card']}>
        <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="movie poster" />
        <h3>{title}</h3>
    </div>
  )
}

export default MovieCard