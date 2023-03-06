import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/redux slices/profile";
import styles from "./TopTenCard.module.css";
import axios from "axios";

const TopTenCard = ({ title, poster, movieId, index }) => {
  const dispatch = useDispatch();

  const removeFromTopTenHandler = () => {};

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
        <button onClick={removeFromTopTenHandler}>X</button>
      </div>
    </div>
  );
};

export default TopTenCard;
