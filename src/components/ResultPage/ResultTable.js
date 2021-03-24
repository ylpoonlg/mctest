import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, makeStyles, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import colors from '../../theme/colors';
import TimeText from '../Timer/TimeText';

import './result.css';

const styles = makeStyles((theme) => ({
  cell: {
    maxHeight: "1rem",
    padding: "0 0.5rem",
    textAlign: "center",
  }
}));

function ResultTable(props) {
  const classes = styles();
  const qdata = JSON.parse(sessionStorage.mc_qdata);
  const ttime = qdata.ttime;
  const testName = qdata.test_name;
  
  // States
  let score = 0;
  const [page, setPage] = useState(0);
  const [RPP, setRPP] = useState(100); // Rows Per Page
  const [rows, setRows] = useState(getResult());

  useEffect(() => {
    setRows(getResult());
  }, [props.refresh]);

  // Get row Data
  function getResult() {
    removeUnansweredQ();
    let ret = [];
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let numq = qdata.numq;
    let scr = 0;
  
    for (var i=1; i<=numq; i++) {
      ret.push({
        ans: qdata["q"+i].ans,
        ms: qdata["q"+i].ms,
        time: qdata["q"+i].time,
      });
      if (qdata["q"+i].ans && qdata["q"+i].ans === qdata["q"+i].ms) scr++;
      else if (qdata["q"+i].ms === "*") scr++;
    }
    score = scr;
    return ret;
  }

  function removeUnansweredQ() {
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let numq = qdata.numq;
    const MIN_QTIME = 15000;
    for (var i=numq; i>1; i--) {
      if (qdata["q"+i].ans == "" && qdata["q"+i].time < MIN_QTIME) {
        deleteQ(i);
      } else {
        break;
      }
    }
  }

  function deleteQ(q) {
    let qdata = JSON.parse(sessionStorage.mc_qdata);
    let numq = qdata.numq;
    if (q < 1 || q > numq) return;

    qdata["ttime"] -= qdata["q"+q]["time"];
    for (var i=q; i<numq; i++) {
      qdata["q"+i] = qdata["q"+(i+1)];
    }
    delete qdata["q"+numq];
    qdata["numq"]--;
    sessionStorage.mc_qdata = JSON.stringify(qdata);
  }


  return (
      <div style={props.style}>
        <TableContainer id="result-table">
          <Table className="table"
              size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={4} style={{textAlign: "center"}}>{testName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}
                  style={{fontFamily: "Share Tech Mono, monospace", fontSize: "100%", textAlign: "center"}}
                >Score: {score}/{qdata.numq}</TableCell>
                <TableCell colSpan={2} style={{textAlign: "center"}}>
                  <TimeText label="Total Time Used: " time={ttime} dp="true" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell} style={{width: "25%"}}>Question</TableCell>
                <TableCell className={classes.cell} style={{width: "25%"}}>Your Answer</TableCell>
                <TableCell className={classes.cell} style={{width: "25%"}}>Correct Answer</TableCell>
                <TableCell className={classes.cell} style={{width: "25%"}}>Time Used</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice(page*RPP, page*RPP+RPP)
                .map((question, index) => {
                let ansColor = colors.answer.default;
                if (question.ms === "*") {
                  ansColor = colors.answer.correct;
                } else if (question.ms != " " && question.ms) {
                  ansColor = (question.ans === question.ms)?colors.answer.correct:colors.answer.wrong;
                }
                return (
                <TableRow key={"result-q"+index}>
                  <TableCell className={classes.cell}>{index + page*RPP + 1}</TableCell>
                  <TableCell className={classes.cell}
                    style={{ background: ansColor }}
                  >{question.ans}</TableCell>
                  <TableCell className={classes.cell}>{question.ms}</TableCell>
                  <TableCell className={classes.cell}><TimeText dp="true" time={question.time}/></TableCell>
                </TableRow>
                )}
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={RPP}
            page={page}
            onChangePage={(e, val) => {setPage(val)}}
            onChangeRowsPerPage={(e) => {
              console.log("event "+e.target.value);
              setRPP(parseInt(e.target.value, 10));
              setPage(0);
            }}
            />
          </TableContainer>
      </div>
  )
}

export default ResultTable