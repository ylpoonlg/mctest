import { Button, Collapse, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import Content from '../Layout/Content';
import ResultTable from './ResultTable';

import colors from '../../theme/colors';
import * as db from '../../firebase/db';
import TitleInput from './TitleInput';

const styles = makeStyles((theme) => ({
  sectionBtn: {
    margin: "0.5rem 0.2rem",
    width: "max-content",
  },
  checkBtn: {
    width: "5rem",
    height: "2.5rem",
    margin: "0 0.5rem",
    color: colors.text.light,
    background: colors.green.main,
    "&:hover": {
      background: colors.green.dark,
    },
    "$:active": {
      background: colors.green.light,
    }
  },
  saveBtn: {
    background: colors.tertiary.main,
    color: colors.text.light,
    "&:hover": {
      background: colors.tertiary.dark,
    },
    "$:active": {
      background: colors.tertiary.light,
    }
  },
  resumeBtn: {
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
  const history = useHistory();

  // States
  const [refresh, setRefresh] = useState(0);
  const [ansSection, setAnsSection] = useState(false);
  const [titleSection, setTitleSection] = useState(false);

  // Title Input
  function onTitleUpdate() {
    console.log("refresh table");
    setRefresh(refresh + 1);
  }

  // Check Anwers
  function getAns() { // get answer stored in sesssionStorage.mc_qdata
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let numq = qdata.numq;
    let ret = "";
    for (var i=1; i<=numq; i++) {
      ret += qdata["q"+i].ms;
    }
    return ret;
  }
  function checkBtnClick(e) {
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let numq = qdata.numq;
    let val = document.getElementById("ans-input").value;
    console.log("val = "+val);
    let ans = val.replaceAll('\n', '');
    console.log("ans = "+ans);

    for (var i=1; i<=ans.length; i++) {
      qdata["q"+i].ms = ans[i-1];
    }
    for (var i=ans.length+1; i<=numq; i++) {
      qdata["q"+i].ms = '';
    }

    sessionStorage.mc_qdata = JSON.stringify(qdata);
    setRefresh(refresh+1);
  }
  document.onkeydown = (e) => {
    let key = e.key;
    if (key === "Enter") {
      checkBtnClick(null);
    }
  }

  // Input Answers
  function formatAnsInput(e=null, reset=false) {
    let LIMIT = 10;
    let EXCLUDE = ['\n', '\r'];
    let val = reset?getAns():document.getElementById("ans-input").value;
    let stripped = "";
    for (var i=0; i<val.length; i++) {
      if (!EXCLUDE.includes(val[i])) {
        stripped += val[i];
      }
    }
    let numq = JSON.parse(sessionStorage.mc_qdata).numq;
    let newVal = "";
    for (var i=1; i<=Math.min(stripped.length, numq); i++) {
      newVal += stripped[i-1];
      if (i % LIMIT === 0) {
        newVal += "\n";
      }
    }
    if (newVal[newVal.length-1] == '\n') {
      newVal = newVal.substr(0, newVal.length-1);
    }
    if (reset) {
      return newVal;
    }
    document.getElementById("ans-input").value = newVal;
  }

  // Save
  function onSave(e) {
    db.saveTest("mytest-123");
  }

  // Resume
  function onResume(e) {
    resetStates();
    history.replace("/test");
  }

  return (
    <Content>
      <Typography variant="h4">Result</Typography>
      {/* Action Buttons */}
      <div className="row">
        <Button className={classes.sectionBtn}
          onClick={(e) => {setTitleSection(!titleSection)}}
          variant="outlined"
          startIcon={titleSection?<ExpandLessIcon />:<ExpandMoreIcon />}
        >Title</Button>

        <Button className={classes.sectionBtn}
          onClick={(e) => {setAnsSection(!ansSection)}}
          variant="outlined"
          startIcon={ansSection?<ExpandLessIcon />:<ExpandMoreIcon />}
        >Answers</Button>

        <Button className={classes.sectionBtn+" "+classes.saveBtn}
          onClick={onSave} variant="contained" startIcon={<CloudUploadIcon />}
        >Save</Button>

        <Button className={classes.sectionBtn+" "+classes.resumeBtn}
          onClick={onResume} variant="contained" startIcon={<PlayCircleFilledWhiteIcon />}
        >Resume</Button>
      </div>

      <div>
        {/* title */}
        <Collapse in={titleSection}>
          <TitleInput onChange={onTitleUpdate} />
        </Collapse>
        
        {/* answer input */}
        <Collapse in={ansSection}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
            padding: "1rem 0",
          }}>
            <textarea id="ans-input" cols={25} rows={5} defaultValue={formatAnsInput(null, true)}
              onKeyDown={formatAnsInput} onKeyUp={formatAnsInput}
              placeholder={"e.g. 'ABCD' = answers of question 1 to 4"}
            ></textarea>
            <Button className={classes.checkBtn} variant="contained" onClick={checkBtnClick}>Check</Button>
          </div>
        </Collapse>
      </div>

      <ResultTable refresh={refresh}
        style={{maxWidth: "50rem", minWidth: "25rem", margin: "1rem auto",}}
      />
    </Content>
  )
}

export default ResultPage

function resetStates() {
  let nowtime = Date.now();
  let testState = {
      curq: JSON.parse(sessionStorage.mc_qdata).numq,
      ispaused: false,
      sttime: nowtime,
      patime: 0,
  }
  sessionStorage.mc_test_state = JSON.stringify(testState);
}