import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import axios from 'axios'
import { movieActions } from "../store/redux slices/movie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";

const TrendingScreen = () => {
  const dispatch = useDispatch();

  const getTrending = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=ab914da83ff50db0baf3acd601780e5f`
      )
      .then((res) => {
        dispatch(movieActions.trending(res.data.results));
        window.scrollTo(0, 0)
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

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div>
      <Header />
      <div className="trending-page">
        <h2>Trending</h2>
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default TrendingScreen;
