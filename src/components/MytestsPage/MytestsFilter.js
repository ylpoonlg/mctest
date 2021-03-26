import React from 'react';
import { makeStyles } from '@material-ui/core';
import TitleSelect from '../ResultPage/TitleSelect';

const styles = makeStyles((theme) => ({
  filterBtn: {
    background: "#ddd",
    border: "solid #aaa 1px", borderRadius: "0.2rem",
    padding: "0.1rem 1rem",
    "&:hover": {
      background: "#eee",
    }
  },
}));

function MytestsFilter(props) {
    const classes = styles();

    return (
      <div className="row">
        <span style={{}}>Filter</span>
        <div style={{margin: "auto"}}>
        <TitleSelect title="Subject" btnClass={classes.filterBtn} toggle={0}>
          <div>ITEM1</div>
          <div>ITEM2</div>
          <div>ITEM2</div>
          <div>ITEM2</div>
          <div>ITEM2</div>
        </TitleSelect>
        </div>

        <div style={{margin: "auto"}}>
        <TitleSelect title="Paper" btnClass={classes.filterBtn} toggle={0}>
          <div>ITEM1</div>
          <div>ITEM2</div>
        </TitleSelect>
        </div>

      </div>
    )
}

export default MytestsFilter
