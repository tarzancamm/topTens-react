import React, { useContext, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import AuthInitialContext from "../store/AuthContext";
import { IoMenu } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { movieActions } from "../store/redux slices/movie";
import axios from 'axios'

const Header = () => {
  const authCtx = useContext(AuthInitialContext);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const page = useSelector((state) => state.movie.page)
  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    dispatch(authCtx.logout)
    navigate('/auth')
  }
  
  const homepageHandler = () => {
    navigate('/')
  }

  const getTopRated = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ab914da83ff50db0baf3acd601780e5f&language=en-US&${page}`)
      .then((res) => {
        dispatch(movieActions.topRated(res.data.results))
        navigate('/toprated')
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

  const getTrending = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=ab914da83ff50db0baf3acd601780e5f`
      )
      .then((res) => {
        console.log(res.data.results);
        dispatch(movieActions.trending(res.data.results));
        navigate("/trending");
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

  return (
    <Fragment>
      <header className={styles.header}>
        <IoMenu className={styles.hamburger} size="30px" onClick={() => setShowMenu(!showMenu)} />
      </header>
      {showMenu && (
        <nav className={styles.nav}>
          <button className={styles['close-menu']} onClick={() => setShowMenu(!showMenu)}>
            <IoArrowBack />
          </button>
          <div className={styles['movie-choices']}>
            <button onClick={homepageHandler}>Most Popular</button>
            <button onClick={getTopRated}>Top Rated</button>
            <button onClick={getTrending}>Trending</button>
          </div>
          <div className={styles.logout}>
                <button onClick={logoutHandler}>Login / Logout</button>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

export default Header;
