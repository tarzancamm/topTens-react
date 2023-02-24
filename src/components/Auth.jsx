import React, { useState, useContext, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import styles from "./Auth.module.css";
import AuthInitialContext from "../store/AuthContext";
import axios from 'axios'

const Auth = () => {
  const [register, setRegister] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const authCtx = useContext(AuthInitialContext);

  const authHandler = (e) => {
    e.preventDefault();

    let body = {
        firstName,
        lastName,
        emailAddress: emailRef.current.value,
        password: passwordRef.current.value,
    }

    register && axios.post(`/register`, body)
        .then((res) => {
            authCtx.login(res.data.token, res.data.userId, res.data.exp, res.data.firstName, res.data.lastName)
            navigate('/')
        })
        .catch((err) => {
            if (err.response) {
                // Client received error in response
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if (err.request) { 
                // Client never received response
                console.log(err.request)
            } else { 
                // Anything else
                console.log('error', err.message)
            }
        })

    !register && axios.post(`/login`, body)
        .then((res) => {
            authCtx.login(res.data.token, res.data.userId, res.data.exp, res.data.firstName, res.data.lastName)
            navigate('/')
        })
        .catch((err) => {
            if (err.response) {
                // Client received error in response
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if (err.request) { 
                // Client never received response
                console.log(err.request)
            } else { 
                // Anything else
                console.log('error', err.message)
            }
        })
  };

  return (
    <div className={styles.page}>
      <div className={styles["auth-section"]}>
        <h3>{register ? "Create Account" : "Welcome Back"}</h3>
        <div className={styles.form}>
          <form onSubmit={authHandler} className={styles["auth-form"]}>
            {register && <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />}
            {register && <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />}
            <input type="text" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button>{register ? "Create" : "Sign In"}</button>
          </form>
        </div>
        {!register && (<button onClick={() => setRegister(!register)} className={styles["change-btn"]}>Create New Account</button>)}
        {register && (<button onClick={() => setRegister(!register)} className={styles["change-btn"]}>Sign In</button>)}
      </div>
    </div>
  );
};

export default Auth;
