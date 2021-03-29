import React, { useState, useEffect } from 'react';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import TitleSelect from './TitleSelect';
import colors from '../../theme/colors';


const styles = makeStyles((theme) => ({
  selectBtn: {

  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0.5rem",
    "&:hover": {
      background: "#eee",
      cursor: "default",
    },
  },
  listBtn: {
    background: "none",
    border: "none",
    margin: "0",
    padding: "0",
  },
  delBtn: {
    color: "#bbb",
    "&:hover": {
      color: colors.red.main,
      cursor: "pointer",
    }
  },
  addItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addInput: {
    display: "block",
    height: "1.6rem", width: "6rem",
    padding: "0rem 0.2rem",
    margin: "auto",
    border: "none", borderBottom: "solid #aaa 1px",
  },
  addBtn: {
    height: "1.8rem", width: "3rem", minWidth: "3rem",
    padding: "0", margin: "0",
    color: colors.text.light,
    borderRadius: "0",
    background: colors.green.main,
    "&:hover": {
      background: colors.green.dark,
    },
    "&:active": {
      background: colors.green.light,
    },
  }
}));

function TitleInput(props) {
  const classes = styles();

  // States
  const [testName, setTestName] = useState(JSON.parse(sessionStorage.mc_qdata).test_name);
  const [refresh, setRefresh] = useState(0);
  const [toggleSub, setToggleSub] = useState(0);
  const [newSubject, setNewSubject] = useState("");
  const [togglePp, setTogglePp] = useState(0);
  const [newPaper, setNewPaper] = useState("");
  const [toggleYr, setToggleYr] = useState(0);
  
  // ---------------------------------------------------
  // ---------------Select Subject----------------------
  // ---------------------------------------------------
  function subjectItems() {
    let items = [];
    let subjects = JSON.parse(localStorage.mc_settings).subjects;
    
    for (var i=0; i<subjects.length; i++) {
      let sub = subjects[i];
      items.push((
        <div className={classes.listItem} key={i} onClick={(e) => {onSelect(sub);}}>
          <span style={{
            display: "inline-block", wordWrap: "break-word",
            width: "80%",
          }}>{subjects[i]}</span>
          <button className={[classes.listBtn, classes.delBtn].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(sub);
          }}>
            <CancelIcon style={{height: "16px", width: "16px"}} />
          </button>
        </div>
      ));
    }
    items.push((
      <div className={classes.addItem} key="add">
        <input className={classes.addInput} value={newSubject} placeholder="New Subject"
          onChange={(e) => {setNewSubject(e.target.value)}} />
        <Button className={classes.addBtn} variant="contained" onClick={onAdd}>
          <AddIcon style={{height: "20px", width: "20px"}} />
        </Button>
      </div>
    ));
    // Select subject
    function onSelect(sub) {
      if (testName && testName[testName.length-1]!=" ") setTestName(testName+" "+sub);
      else setTestName(testName+sub);
      setToggleSub(toggleSub+1);
    }
    // Delete subject
    function onDelete(sub) {
      let settings = JSON.parse(localStorage.mc_settings);
      let index = settings.subjects.indexOf(sub);
      if (index > -1) {
        settings.subjects.splice(index, 1);
        localStorage.mc_settings = JSON.stringify(settings);
      }
      setRefresh(refresh+1);
    }
    // Add new subject
    function onAdd(e) {
      let settings = JSON.parse(localStorage.mc_settings);
      if (newSubject == "") { // Invalid input
        alert("Input cannot be empty.");
      } else if (settings.subjects.indexOf(newSubject) != -1) {
        alert(`"${newSubject}" already exists.`);
      } else {
        settings.subjects.push(newSubject);
        localStorage.mc_settings = JSON.stringify(settings);
        setRefresh(refresh+1);
        setNewSubject("");
      }
    }
    return items;
  }


  // ---------------------------------------------------
  // ---------------Select Paper------------------------
  // ---------------------------------------------------
  function paperItems() {
    let items = [];
    let papers = JSON.parse(localStorage.mc_settings).papers;
    
    for (var i=0; i<papers.length; i++) {
      let ppr = papers[i];
      items.push((
        <div className={classes.listItem} key={i} onClick={(e) => {onSelect(ppr);}}>
          <span>{papers[i]}</span>
          <button className={[classes.listBtn, classes.delBtn].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ppr);
          }}>
            <CancelIcon style={{height: "16px", width: "16px"}} />
          </button>
        </div>
      ));
    }
    items.push((
      <div className={classes.addItem} key="add">
        <input className={classes.addInput} value={newPaper} placeholder="New Paper"
          onChange={(e) => {setNewPaper(e.target.value)}} />
        <Button className={classes.addBtn} variant="contained" onClick={onAdd}>
          <AddIcon style={{height: "20px", width: "20px"}} />
        </Button>
      </div>
    ));
    // Select paper
    function onSelect(ppr) {
      if (testName && testName[testName.length-1]!=" ") setTestName(testName+" "+ppr);
      else setTestName(testName+ppr);
      setTogglePp(togglePp+1);
    }
    // Delete paper
    function onDelete(ppr) {
      let settings = JSON.parse(localStorage.mc_settings);
      let index = settings.papers.indexOf(ppr);
      if (index > -1) {
        settings.papers.splice(index, 1);
        localStorage.mc_settings = JSON.stringify(settings);
      }
      setRefresh(refresh+1);
    }
    // Add new paper
    function onAdd(e) {
      let settings = JSON.parse(localStorage.mc_settings);
      if (newPaper == "") { // Invalid input
        alert("Input cannot be empty.");
      } else if (settings.papers.indexOf(newPaper) != -1) {
        alert(`"${newPaper}" already exists.`);
      } else {
        settings.papers.push(newPaper);
        localStorage.mc_settings = JSON.stringify(settings);
        setRefresh(refresh+1);
        setNewPaper("");
      }
    }
    return items;
  }

  // ---------------------------------------------------
  // ---------------Select Year------------------------
  // ---------------------------------------------------
  function yearItems() {
    let items = [];
    let curDate = new Date();
    for (var i=curDate.getFullYear(); i>=1980; i--) {
      let yr = i;
      items.push((
        <div className={classes.listItem} key={i} onClick={(e) => {onSelect(yr);}}>
          <span>{i}</span>
        </div>
      ));
    }

    // Select Year
    function onSelect(yr) {
      if (testName && testName[testName.length-1]!=" ") setTestName(testName+" "+yr);
      else setTestName(testName+yr);
      setToggleYr(toggleYr+1);
    }

    return items;
  }


  // On test name change
  useEffect(() => {
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    qdata.test_name = testName;
    sessionStorage.mc_qdata = JSON.stringify(qdata);
    props.onChange();
  }, [testName])

  // MAIN
  return (
    <div style={{ padding: "1rem 0", }}>
      <Grid container direction="row" justify="center">
        <TitleSelect title="Subject" refresh={refresh} toggle={toggleSub}>
          {subjectItems()}
        </TitleSelect>

        <TitleSelect title="Paper" refresh={refresh} toggle={togglePp}>
          {paperItems()}
        </TitleSelect>

        <TitleSelect title="Year" refresh={refresh} toggle={toggleYr}>
          {yearItems()}
        </TitleSelect>
      </Grid>
      <TextField value={testName} onChange={(e) => {setTestName(e.target.value)}}
        placeholder="Title of the Test" variant="standard" style={{marginTop: "0.8rem"}}
      />
    </div>
  )
}

export default TitleInput