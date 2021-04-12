import React from 'react'
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router';
import Content from '../Layout/Content'
import GoogleLogo from './google_logo.svg';
import FacebookLogo from './facebook_logo.png';
import GithubLogo from './github_logo.png';

import * as auth from '../../firebase/auth';
import firebase from 'firebase';

import '../../style/style.css';
import './login.css';

let new_sign_in = false;

const styles = makeStyles((theme) => ({
  
}));

function LoginPage() {
  const classes = styles();
  const history = useHistory();

  console.log("Check login state");

  firebase.auth().onAuthStateChanged(user => {
    if (user && !new_sign_in) {
      console.log("User has already signed in.");
      afterSignedIn();
    }
  });

  function googleSignin(e) {
    new_sign_in = true;
    auth.googleSignin(afterSignedIn);
  }

  function facebookSignin(e) {
    new_sign_in = true;
  }

  function githubSignin(e) {
    new_sign_in = true;
  }

  function afterSignedIn() {
    new_sign_in = false;
    history.replace("/user");
  }

  return (
    <Content>
      <Typography variant="h4">Sign In</Typography>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem 0"}}>
        <button id="google-signin-btn" className="signin-btn" onClick={googleSignin}>Login with Google</button>
        <p>Coming soon:</p>
        <button id="facebook-signin-btn" className="signin-btn" onClick={facebookSignin}>Login with Facebook</button>
        <button id="github-signin-btn" className="signin-btn" onClick={githubSignin}>Login with Github</button>
        <a className="a-btn" onClick={(e) => {history.goBack()}} style={{marginTop: "20vh"}}>return</a>
      </div>
    </Content>
  )
}

export default LoginPage
