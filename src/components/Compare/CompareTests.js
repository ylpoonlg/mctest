import { Button, makeStyles, Typography } from '@material-ui/core'
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
    let tests = localStorage.mc_compare?JSON.parse(localStorage.mc_compare):{};

    for (var i in tests) {
      let j = i;
      res.push((<div key={j} onClick={(e) => {
        sessionStorage.mc_compareTestAns = JSON.stringify([j, tests[j]]);
        history.push("/compare");
      }} className={[classes.item, "row"].join(" ")} >
        <h5 style={{width: "12rem"}}>{j}</h5>
        <Button style={{background: "#ff0000", color: "#fff",}} variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            let tmp = JSON.parse(localStorage.mc_compare);
            delete tmp[j];
            localStorage.mc_compare = JSON.stringify(tmp);
            setUpdate(update + 1);
        }}>Delete</Button>
      </div>));
    }

    return res;
  }

  return (
    <Content>
      <Typography variant="h4">Tests</Typography>

      <Typography variant="h5" style={{marginTop: "2rem"}}>Local</Typography>

      <div style={{marginTop: "1rem", marginBottom: "2rem"}}>
        {getTests()}
      </div>
      <div>
        <Button color="secondary" variant="contained" style={{color: "#fff"}}
          onClick={(e) => {
            sessionStorage.mc_compareTestAns = JSON.stringify(["", []]);
            history.push("/compare");
          }}
        >New</Button>
      </div>
    </Content>
  )
}

export default CompareTests
