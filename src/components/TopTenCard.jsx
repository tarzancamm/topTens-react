import React, {useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/redux slices/profile";
import AuthInitialContext from "../store/AuthContext";
import styles from "./TopTenCard.module.css";
import axios from "axios";

const TopTenCard = ({ title, poster, movieId, index }) => {
  const dispatch = useDispatch();
  const {userId} = useContext(AuthInitialContext)

  const removeFromProfileHandler = () => {
    let body = {
        movieId,
    }
    axios
        .put(`/profile/${userId}`, body)
        .then(() => {
            console.log("Movie successfully deleted from top ten")
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
              console.log('ERROR', err.message)
          }
          })
  };

  return (
    <div className={styles.toptencard}>
      <div className={styles.ranking}>
        <h2># {index + 1}</h2>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${poster}`}
        alt="movie poster"
      />
      <div className={styles['toptencard-info']}>
        <h3>{title}</h3>
        <button onClick={removeFromProfileHandler}>X</button>
      </div>
    </div>
  );
};

export default TopTenCard;
