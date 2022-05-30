import { Button, Input, makeStyles, Typography } from '@material-ui/core';
import { React, useEffect, useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Content from '../Layout/Content'
import AddAns from './AddAns';
import { useHistory } from 'react-router';

const styles = makeStyles((theme) => ({
  compareTable: {
    borderCollapse: "collapse",
    margin: "auto",
  },
  tableHeader: {
    border: "solid #aaa 2px",
    background: "#ddd",
  },
  tableCell: {
    border: "solid #ccc 1px",
  },
  tableStat: {
    border: "solid #ccc 1px",
    background: "#ccddff",
  },
  tableAns: {
    border: "solid #ccc 1px",
    background: "#99aaff",
  },
  tableCorrect: {
    border: "solid #ccc 1px",
    background: "#55ff99",
  },
  tableWrong: {
    border: "solid #ccc 1px",
    background: "#ff5555",
  },
  tableTie: {
    border: "solid #ccc 1px",
    background: "#ffdd55",
  },
}));

function ComparePage(props) {
  const classes = styles();
  const history = useHistory();

  const storageData = sessionStorage.mc_compareTestAns;

  const [update, setUpdate] = useState(0);
  const [ansVer, setAnsVer] = useState(storageData ? JSON.parse(storageData)[1] : []);
  const [numq, setNumq] = useState(1);
  const [testName, setTestName] = useState(storageData ? JSON.parse(storageData)[0] : "");

  function addAns(e) {
    console.log("add ans");
    let tmp = ansVer;
    tmp.push({ "name": "", "ans": "" });
    setAnsVer(tmp);
    setUpdate(update => update + 1);
  }

  function headerQ() {
    let res = [];
    for (var i=0; i<numq; i++) {
      res.push((<th className={classes.tableHeader} style={{minWidth: "2rem"}}>{i+1}</th>));
    }
    return res;
  }

  function genTable() {

    let res = [];
    let choices = {};
    let choiceStat = [];
    for (var i=0;i<numq;i++) choiceStat.push({});

    for (var i=0; i<ansVer.length; i++) {
      for (var q=0; q<numq; q++) {
        let qans = ansVer[i].ans[q];

        if (choices[qans]) {
          choices[qans]++;
        } else if (qans) {
          choices[qans] = 1;
        }

        if (choiceStat[q][qans]) {
          choiceStat[q][qans]++;
        } else if (qans) {
          choiceStat[q][qans] = 1;
        }
      }
    }

    let totalAns = []; // stores total answers for that question
    let probAns = [];
    for (var q=0; q<numq; q++) {
      let tmp = 0;
      let maxAns = 0;
      for (var numa in choiceStat[q]) {
        tmp += choiceStat[q][numa];
        maxAns = Math.max(maxAns, choiceStat[q][numa]);
      }
      totalAns.push(tmp);
      probAns.push(maxAns);
    }

    for (var i=0; i<ansVer.length; i++) {
      let ans = [];
      let score = 0;

      for (var q=0; q<numq; q++) {
        let qans = ansVer[i].ans[q];
        let tie = 0;
        for (var numa in choiceStat[q]) {
          if (choiceStat[q][numa] == probAns[q]) tie++;
        }

        ans.push((<td key={q} className={choiceStat[q][qans]==probAns[q] ? 
          (tie > 1 ? classes.tableTie : classes.tableCorrect) : classes.tableWrong}
        >
          {qans}
        </td>));

        if (choiceStat[q][qans] == probAns[q]) {
          score++;
        }
      }

      ans.splice(0, 0, (
        <td key={-1} className={classes.tableCell}>{score}</td>
      ));

      res.push((<tr key={"ansver"+i}>
        <td className={classes.tableCell}>{ansVer[i].name}</td>
        {ans}
      </tr>));
    }
    
    let ans = [];
    for (var q=0; q<numq; q++) {
      let ansChoice = [];
      for (var choice in choices) {
        if (choiceStat[q][choice] === probAns[q]) {
          ansChoice.push(choice);
        }
      }
      ans.push((<td className={classes.tableAns}>{ansChoice.join("/")}</td>))
    }
    res.push((<tr>
      <td className={classes.tableAns} colSpan={2}>Probable Answer</td>
      {ans}
    </tr>));

    let sortedChoices = [];
    for (var choice in choices) {
      sortedChoices.push(choice);
    }
    sortedChoices.sort()

    // STATISTICS
    for (let i=0; i<sortedChoices.length; i++) {
      let choice = sortedChoices[i];
      let stat = [(<td className={classes.tableStat}>{choice}</td>)];
      for (let q=0; q<numq; q++) {
        let numa = choiceStat[q][choice];
        let percentage = Math.round(numa/totalAns[q] * 100);
        stat.push((<td key={q} className={numa == probAns[q] ? classes.tableAns : classes.tableStat}>
          {numa ? percentage : 0 }%
        </td>));
      }

      res.push((<tr>
        <td className={classes.tableStat}></td>
        {stat}
      </tr>));
    }

    return res;
  }

  function getNumq() {
    let newVal = 0;
    for (var i=0; i<ansVer.length; i++) {
      newVal = Math.max(newVal, ansVer[i].ans.length);
    }
    setNumq(newVal);
  }

  useEffect(() => {
    getNumq();
  }, [update]);


  // Save
  function onSave(e) {
    let compareTests = localStorage.mc_compare ? JSON.parse(localStorage.mc_compare) : {};
    compareTests[testName] = ansVer;
    localStorage.mc_compare = JSON.stringify(compareTests);
  }

  return (
  <Content>
    <div className="row">
      <button className="base-btn icon-btn" style={{marginRight: "1rem"}}
        onClick={(e) => {
          history.goBack();
        }}
      >
        <ArrowBackIcon />
      </button>
      <Typography variant="h4">Compare Result Versions</Typography>
    </div>
    
    <div>
      <div style={{ marginTop: "1.2rem", marginBottom: "2rem", overflowX: "auto" }}>
        <table className={classes.compareTable}>
        <tr>
          <th className={classes.tableHeader}
            style={{minWidth: "5rem"}}
          >Name</th>
          <th className={classes.tableHeader}>Score</th>
          {headerQ()}
        </tr>
        {genTable()}
        </table>
      </div>

      <div className="row" style={{ marginBottom: "2rem" }}>
        <Input style={{ marginRight: "1.6rem" }} placeholder="Test Name" onChange={(e) => {
          setTestName(e.target.value);
        }} value={testName} />
        <Button variant="outlined" onClick={onSave}>Save</Button>
      </div>

      <div>
        {ansVer.map((rec, i) => {
          return (
          <AddAns key={i} name={rec.name} ans={rec.ans} onUpdate={(name, ans) => {
            let tmp = ansVer;
            tmp[i] = { "name": name, "ans": ans };
            setAnsVer(tmp);
            setUpdate(update => update + 1);
          }}
          onRemove={() => {
            if (ansVer.length >= 1) {
            let tmp = ansVer;
            tmp.splice(i, 1);
            setAnsVer(tmp);
            setUpdate(update => update + 1);
            }
          }}
          />
          )
        })}
        <div style={{marginTop: "1.5rem"}}>
          <Button variant="contained" color="secondary" style={{color: "#fff"}}
            onClick={addAns}
          >Add</Button>
        </div>
      </div>
    </div>
  </Content>
  )
}

export default ComparePage
