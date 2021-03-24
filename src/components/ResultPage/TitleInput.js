import React, { useState } from 'react';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import TitleSelect from './TitleSelect';
import colors from '../../theme/colors';


const styles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0.5rem",
    "&:hover": {
      background: "#eee",
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

function TitleInput() {
  const classes = styles();
  const [refresh, setRefresh] = useState(0);
  const [toggleSub, setToggleSub] = useState(0);
  const [togglePp, setTogglePp] = useState(0);

  // Select Subject
  function subjectItems() {
    let items = [];
    let subjects = JSON.parse(localStorage.mc_settings).subjects;

    for (var i=0; i<subjects.length; i++) {
      let sub = subjects[i];
      items.push((
        <div className={classes.listItem} key={i} onClick={(e) => {onSelect(sub);}}>
          <span>{subjects[i]}</span>
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
        <input className={classes.addInput} />
        <Button className={classes.addBtn} variant="contained">
          <AddIcon style={{height: "20px", width: "20px"}} />
        </Button>
      </div>
    ));
    // Select item
    function onSelect(sub) {
      console.log("selected "+sub);
      setToggleSub(toggleSub+1);
    }
    // Delete item
    function onDelete(sub) {
      console.log("delete "+sub);
      setRefresh(refresh+1);
    }
    // Add item
    function onAdd(sub) {

    }
    return items;
  }


  function paperItems() {
    return ["DSE", "CE", "AL"];
  }



  // MAIN
  return (
    <div style={{ padding: "1rem 0", }}>
      <Grid container direction="row" justify="center">
        <TitleSelect title="Subject" refresh={refresh} toggle={toggleSub}>
          {subjectItems()}
        </TitleSelect>
      </Grid>
      <TextField placeholder="Title of the Test" variant="standard"
        style={{marginTop: "0.8rem"}}
      />
    </div>
  )
}

export default TitleInput