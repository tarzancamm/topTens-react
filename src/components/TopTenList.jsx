import React, { useEffect, useCallback } from "react";
import { profileActions } from "../store/redux slices/profile";
import styles from "./TopTenList.module.css";
import { useSelector, useDispatch } from "react-redux";
import TopTenCard from "./TopTenCard";
import axios from "axios";

const TopTenList = () => {
  const dispatch = useDispatch();
  const topMovies = useSelector((state) => state.profile.topTenMovies);
  const topDetails = useSelector((state) => state.profile.topTenDetails);

  const setupDetailedTopTen = () => {
    for (let i = 0; i < topMovies.length; i++) {
      let movieId = topMovies[i].movieId;

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=ab914da83ff50db0baf3acd601780e5f&language=en-US`
        )
        .then((res) => {
          dispatch(profileActions.topDetails(res.data));
        })
        .then(() => {
          console.log(topDetails);
        })
        .catch((err) => {
          if (err.response) {
            console.log("Client received error in response");
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log("Client never received response");
            console.log(err.request);
          } else {
            console.log("ERROR", err.message);
          }
        });
    }
  };

  useEffect(() => {
    setupDetailedTopTen();
  }, [topMovies]);

  const topTenDisplay = topDetails.map((movie, index) => {
    return (
      <TopTenCard
        poster={movie.poster_path}
        title={movie.title}
        key={movie.id}
        movieId={movie.id}
        index={index}
      />
    );
  });

  return <div className={styles.toptendisplay}>{topTenDisplay}</div>;
};

export default TopTenList;
