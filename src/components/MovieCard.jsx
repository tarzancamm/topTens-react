import React, {useContext} from "react";
import styles from "./MovieCard.module.css";
import axios from 'axios'
import AuthInitialContext from "../store/AuthContext";

const MovieCard = ({ poster, title, movieId}) => {
  const {userId} = useContext(AuthInitialContext)

  const addToProfileHandler = () => {
    let body = {
        movieId,
    }

    axios.post(`/profile/${userId}`, body)
    .then(() => {
        console.log("Successfully added movie to Top Ten")
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
          console.log('error', err.message)
      }
      })
  };

  return (
    <div className={styles["movie-card"]}>
      <img
        src={`https://image.tmdb.org/t/p/original${poster}`}
        alt="movie poster"
      />
      <div className={styles.info}>
        <h3>{title}</h3>
        <button onClick={addToProfileHandler}>+</button>
      </div>
    </div>
  );
};

export default MovieCard;
