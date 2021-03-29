import React, { useEffect, useState } from 'react';
import { ListItemSecondaryAction, makeStyles, TextField } from '@material-ui/core';
import TitleSelect from '../ResultPage/TitleSelect';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import colors from '../../theme/colors';

const styles = makeStyles((theme) => ({
  filterBtn: {
    width: "10rem",
    background: "#ddd",
    border: "solid #aaa 1px", borderRadius: "0.2rem",
    padding: "0.1rem 1rem",
    "&:hover": {
      background: "#eee",
    }
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
  addInput: {
    display: "block",
    height: "1.6rem", width: "7rem",
    padding: "0rem 0.2rem",
    margin: "auto",
    border: "none", borderBottom: "solid #aaa 1px",
  },
  addBtn: {
    height: "1.8rem", width: "3rem", minWidth: "3rem",
    padding: "0", margin: "0",
    color: colors.text.light,
    border: "none",
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

function MytestsFilter(props) {
    const classes = styles();

    const [subFilter, setSubFilter] = useState("");
    const [pprFilter, setPprFilter] = useState("");
    const [toggleSub, setToggleSub] = useState(0);
    const [togglePpr, setTogglePpr] = useState(0);

    useEffect(() => {
      props.onChange({
        subject: subFilter,
        paper: pprFilter
      });
    }, [subFilter, pprFilter]);

    function subjectItems() {
      let items = [];
      let testState = JSON.parse(localStorage.mc_settings);
      let subjects = testState.subjects;

      items.push((
        <div key="all" className={"row "+classes.listItem}
          onClick={(e) => {
            setSubFilter("");
            setToggleSub(toggleSub+1);
          }}
        >
          <ClearAllIcon />
          <span style={{margin: "auto"}}>Clear Filter</span>
        </div>
      ));

      items.push((
        <div key="input" className="row" style={{padding: "0.2rem 0"}}>
          <input className={classes.addInput} placeholder="Filter"
            value={subFilter} onChange={addItem} onKeyDown={addItem} onKeyUp={addItem} />
        </div>
      ));

      for (var i=0; i<subjects.length; i++) {
        let index = i;
        items.push((
          <div key={i} className={"row "+classes.listItem} onClick={(e) => {selectItem(subjects[index])}}>
            <span style={{ display: "inline-block", wordWrap: "break-word",
              width: "100%",
           }}>{subjects[index]}</span>
          </div>
        ));
      }
      
      // Select
      function selectItem(subject) {
        setSubFilter(subject);
        setToggleSub(toggleSub+1);
      }
      //Add
      function addItem(e) {
        setSubFilter(e.target.value);
      }
      return items;
    }

    function paperItems() {
      let items = [];
      let testState = JSON.parse(localStorage.mc_settings);
      let papers = testState.papers;

      items.push((
        <div key="all" className={"row "+classes.listItem}
          onClick={(e) => {
            setPprFilter("");
            setTogglePpr(togglePpr+1);
          }}
        >
          <ClearAllIcon />
          <span style={{margin: "auto"}}>Clear Filter</span>
        </div>
      ));

      items.push((
        <div key="input" className="row" style={{padding: "0.2rem 0"}}>
          <input className={classes.addInput} placeholder="Filter"
            value={pprFilter} onChange={addItem} onKeyDown={addItem} onKeyUp={addItem} />
        </div>
      ));
      for (var i=0; i<papers.length; i++) {
        let index = i;
        items.push((
          <div key={i} className={"row "+classes.listItem} onClick={(e) => {selectItem(papers[index])}}>
            <span style={{ display: "inline-block", wordWrap: "break-word",
              width: "100%",
           }}>{papers[index]}</span>
          </div>
        ));
      }
      // Select
      function selectItem(paper) {
        setPprFilter(paper);
        setTogglePpr(togglePpr+1);
      }
      //Add
      function addItem(e) {
        setPprFilter(e.target.value);
      }
      return items;
    }

    return (
      <div className="row" style={{justifyContent: "left"}}>
        <span>Filters</span>
        <div className="row" style={{margin: "auto"}}>
          <div style={{margin: "0 0.6rem"}}>
            <TitleSelect title={subFilter==""?"Subject":"*Subject"} btnClass={classes.filterBtn} toggle={toggleSub}>
              {subjectItems()}
            </TitleSelect>
          </div>

          <div style={{margin: "0 0.6rem"}}>
            <TitleSelect title={pprFilter==""?"Paper":"*Paper"} btnClass={classes.filterBtn} toggle={togglePpr}>
              {paperItems()}
            </TitleSelect>
          </div>
        </div>
      </div>
    )
}

export default MytestsFilter
