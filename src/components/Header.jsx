import React, { useContext, useState, Fragment } from "react";
import styles from "./Header.module.css";
import AuthInitialContext from "../store/AuthContext";
import { IoMenu } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  const authCtx = useContext(AuthInitialContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Fragment>
      <header className={styles.header}>
        <IoMenu size="30px" onClick={() => setShowMenu(!showMenu)} />
      </header>
      {showMenu && (
        <nav className={styles.nav}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <IoArrowBack />
          </button>
          <Link to="/auth">
            <button onClick={() => authCtx.logout()}>Logout</button>
          </Link>
        </nav>
      )}
    </Fragment>
  );
};

export default Header;
