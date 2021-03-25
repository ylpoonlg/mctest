import React, { useEffect, useState } from 'react'
import { Button, Collapse, Fade, makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import colors from '../../theme/colors';

const styles = makeStyles((theme) => ({
  selectBtn: {
    width: "10rem",
    fontSize: "120%",
    padding: "0.2rem",
    margin: "0 0.1rem",
    background: "#fff",
    "&:hover": {
      background: "#fafafa",
      cursor: "pointer",
      boxShadow: "#ddd 0 0 5px",
    },
    border: "none",
    borderBottom: `solid ${colors.tertiary.main} 3px`,
  },
  selectDropdown: {
    width: "100%", maxHeight: "12rem",
    background: "#fff",
    boxShadow: "#aaa 0 0 5px",
    zIndex: 100, overflow: "auto",
  },
}));

function TitleSelect(props) {
  const classes = styles();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (props.toggle != 0) setShowDropdown(!showDropdown);
  }, [props.toggle]);

  return (
    <div style={{position: "relative", width: "min-content",}}>
      <button className={classes.selectBtn} onClick={() => {setShowDropdown(!showDropdown)}}>
        <div className="row">
          <span>{props.title}</span>
        </div>
      </button>

      <Fade in={showDropdown}>
        <div className={classes.selectDropdown}
          style={{position: "absolute",}}>
          {props.children}
        </div>
      </Fade>
    </div>
  )
}

export default TitleSelect
