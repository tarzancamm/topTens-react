import React, { useContext, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.css";
import AuthInitialContext from "../store/AuthContext";
import { IoMenu } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

const Header = () => {
  const authCtx = useContext(AuthInitialContext);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    dispatch(authCtx.logout)
    navigate('/auth')
  }

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
            <button>Most Popular</button>
            <button>Top Rated</button>
            <button>Trending</button>
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
