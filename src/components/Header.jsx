import React, { useContext, useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.css";
import AuthInitialContext from "../store/AuthContext";
import { IoMenu } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import {CgGhostCharacter} from 'react-icons/cg'
import topTenLogo from '../resources/topTenLogo.png'

const Header = () => {
  const authCtx = useContext(AuthInitialContext);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    dispatch(authCtx.logout)
    navigate('/auth')
  }
  
  const homepageHandler = () => {
    navigate('/')
  }

  return (
    <Fragment>
      <header className={styles.header}>
        <IoMenu className={styles.hamburger} size="30px" onClick={() => setShowMenu(!showMenu)} />
        <img src={topTenLogo} alt="logo" />
      </header>
      {showMenu && (
        <nav className={styles.nav}>
          <button className={styles['close-menu']} onClick={() => setShowMenu(!showMenu)}>
            <IoArrowBack />
          </button>
          <div className={styles['movie-choices']}>
            <button onClick={homepageHandler}>Most Popular</button>
            <Link to='/toprated'>
                <button>Top Rated</button>
            </Link>
            <Link to='/trending'>
                <button>Trending</button>
            </Link>
            <Link to='/profile' className={styles.profilebtn}>
                <CgGhostCharacter className={styles.ghost}/>
                <button>Profile</button>
            </Link>
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
