import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination } from '@material-ui/core'
import React, { useState } from 'react'
import TimeText from '../Timer/TimeText';

import './result.css';

function getResult() {
  let ret = [];
  let qdata = JSON.parse(sessionStorage.mc_qdata);
  const numq = qdata.numq;

  for (var i=1; i<=numq; i++) {
    ret.push({
      ans: qdata["q"+i].ans,
      ms: qdata["q"+i].ans,
      time: qdata["q"+i].time,
    });
  }

  return ret;
}

function ResultTable(props) {
  const qdata = JSON.parse(sessionStorage.mc_qdata);
  const ttime = qdata.ttime;

  const rows = getResult();

  // States
  const [page, setPage] = useState(0);
  const [RPP, setRPP] = useState(100);

  return (
      <div style={props.style}>
        <TableContainer id="result-table">
          <Table className="table"
              size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}
                  style={{fontFamily: "Share Tech Mono, monospace", fontSize: "100%"}}
                >Score: {props.score}</TableCell>
                <TableCell colSpan={2}>
                  <TimeText label="Total Time Used: " time={ttime} dp="true" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{width: "25%"}}>Question</TableCell>
                <TableCell style={{width: "25%"}}>Your Answer</TableCell>
                <TableCell style={{width: "25%"}}>Correct Answer</TableCell>
                <TableCell style={{width: "25%"}}>Time Used</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice(page*RPP, page*RPP+RPP)
                .map((question, index) => (
                <TableRow key={"result-q"+index}>
                  <TableCell>{index + page*RPP + 1}</TableCell>
                  <TableCell>{question.ans}</TableCell>
                  <TableCell>{question.ms}</TableCell>
                  <TableCell><TimeText dp="true" time={question.time}/></TableCell>
                </TableRow>
              ))}
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
