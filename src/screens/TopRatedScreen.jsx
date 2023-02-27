import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieList from '../components/MovieList'
import { useSelector, useDispatch } from "react-redux";
import { movieActions } from "../store/redux slices/movie";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const TopRatedScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [increment, setIncrement] = useState(1);
  const page = useSelector((state) => state.movie.page);

  const getTopRated = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=ab914da83ff50db0baf3acd601780e5f&language=en-US&${page}`
      )
      .then((res) => {
        dispatch(movieActions.topRated(res.data.results));
        navigate("/toprated");
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
          // Anything else
          console.log("error", err.message);
        }
      });
  };

  // Page functions
  const nextPage = () => {
    setIncrement(increment + 1);
    dispatch(movieActions.page(increment));
  };

  const prevPage = () => {
    setIncrement(increment - 1);
    dispatch(movieActions.page(increment));
  };

  useEffect(() => {
    getTopRated();
    console.log(page);
  }, [page]);

  return (
    <div>
      <Header />
      <div className='top-page'>
        <h2>Top Rated</h2>
        <div className='prevnext'>
          <button onClick={page !== 1 && increment !== 1 ? prevPage : undefined}>Prev</button>
          <button onClick={nextPage}>Next</button>
        </div>
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default TopRatedScreen;
