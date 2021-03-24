import React from 'react'
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router';
import Content from '../Layout/Content'
import GoogleLogo from './google_logo.svg';
import FacebookLogo from './facebook_logo.png';
import GithubLogo from './github_logo.png';

import '../../style/style.css';
import './login.css';

const styles = makeStyles((theme) => ({
  
}));

function LoginPage() {
  const classes = styles();
  const history = useHistory();

  return (
    <Content>
      <Typography variant="h4">Sign In</Typography>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem 0"}}>
        <h4>// TODO: </h4>
        <button id="google-signin-btn" className="signin-btn">Login with Google</button>
        <button id="facebook-signin-btn" className="signin-btn">Login with Facebook</button>
        <button id="github-signin-btn" className="signin-btn">Login with Github</button>
        <a className="a-btn" onClick={(e) => {history.goBack()}} style={{marginTop: "20vh"}}>return</a>
      </div>
    </Content>
  )
}

export default LoginPage
