import { Button, Collapse, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import Content from '../Layout/Content';
import ResultTable from './ResultTable';

import colors from '../../theme/colors';

const styles = makeStyles((theme) => ({
  checkBtn: {
    width: "5rem",
    height: "2.5rem",
    margin: "0 0.5rem",
    background: colors.secondary.main,
    color: colors.text.light,
    "&:hover": {
      background: colors.secondary.dark,
    },
    "$:active": {
      background: colors.secondary.light,
    }
  },
}));

function ResultPage() {
  const classes = styles();

  // States
  const [refresh, setRefresh] = useState(0);
  const [ansSection, setAnsSection] = useState(false);
  
  function checkBtnClick(e) {
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    const numq = qdata.numq;

    for (var i=1; i<=numq; i++) {
      qdata["q"+i].ms = "C";
    }

    sessionStorage.mc_qdata = JSON.stringify(qdata);
    setRefresh(refresh+1);
  }

  function formatAnsInput(e) {

  }

  return (
    <Content>
      <Typography variant="h4">Result</Typography>

      <div>
        <Button onClick={(e) => {setAnsSection(!ansSection)}}
          variant="outlined"
          startIcon={ansSection?<ExpandLessIcon />:<ExpandMoreIcon />}
        >
          Answers
        </Button>
        <Collapse in={ansSection}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
            padding: "1rem 0",
          }}>
            <textarea id="ans-input" cols={25} rows={5}
              onKeyDown={formatAnsInput} onKeyUp={formatAnsInput}
            ></textarea>
            <Button className={classes.checkBtn} variant="contained" onClick={checkBtnClick}>Check</Button>
          </div>
        </Collapse>
      </div>

      <ResultTable refresh={refresh}
        style={{maxWidth: "50rem", minWidth: "15rem", margin: "1rem auto",}}
      />
    </Content>
  )
}

export default ResultPage
