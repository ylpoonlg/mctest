import { makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Content from '../Layout/Content'

const styles = makeStyles((theme) => ({
  item: {
    border: "solid #ccc 1px",
    borderRadius: "5px",
    padding: "1.5rem",
    "&:hover": {
      background: "#eee",
    },
    margin: "1rem 2.5rem",
  }
}));

function CompareTests() {
  const classes = styles();
  const history = useHistory();

  const [update, setUpdate] = useState(0);

  function getTests() {
    let res = [];
    let tests = JSON.parse(localStorage.mc_compare);

    for (var i in tests) {
      let j = i;
      res.push((<div key={j} onClick={(e) => {
        sessionStorage.mc_compareTestAns = JSON.stringify([j, tests[j]]);
        history.push("/compare");
      }} className={[classes.item, "row"].join(" ")} >
        <h5 style={{width: "10rem"}}>{j}</h5>
        <button onClick={(e) => {
          e.stopPropagation();
          let tmp = JSON.parse(localStorage.mc_compare);
          delete tmp[j];
          localStorage.mc_compare = JSON.stringify(tmp);
          setUpdate(update + 1);
        }}>Delete</button>
      </div>));
    }

    return res;
  }

  return (
    <Content>
      <Typography variant="h4">Tests</Typography>

      <div style={{marginTop: "2rem"}}>
        {getTests()}
      </div>
    </Content>
  )
}

export default CompareTests
