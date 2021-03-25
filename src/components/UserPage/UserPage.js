import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

import Content from '../Layout/Content';
import colors from '../../theme/colors';
import * as auth from '../../firebase/auth';

function UserPage() {
  const history = useHistory();
  let [user, setUser] = useState("");

  function onSignout(e) {
    auth.signout(() => {
      history.replace("/login");
    });
  }

  auth.getUser((user) => {
    setUser(user.displayName);
  });

  return (
    <Content>
      <Typography variant="h5" style={{wordWrap: "break-word"}}>Welcome back, {user}!</Typography>
      <div style={{margin: "2rem 0"}}>
        <Button onClick={() => {
          history.push("/mytests");
        }}
          variant="contained" color="secondary" style={{color: colors.text.light}}>My Tests</Button>
      </div>
      <a className="a-btn" onClick={onSignout} style={{marginTop: "20vh"}}>Sign Out</a>
    </Content>
  )
}

export default UserPage
