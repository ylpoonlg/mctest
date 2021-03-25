import React, { useState } from 'react';
import { makeStyles, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow } from '@material-ui/core';
import PropagateLoader from 'react-spinners/PropagateLoader';

import * as db from '../../firebase/db';
import './mytests.css';

const styles = makeStyles((theme) => ({
  
}));

function MytestsTable(props) {
  const classes = styles();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [RPP, setRPP] = useState(100); // Rows Per Page
  const [rows, setRows] = useState([]);
  //getTests();

  /*tdata format: {"numt": 3, "t1": {...}, "t2": {...}, "t3": {...}}*/
  function getTests() {
    if (loading) {
      db.getMytests((tdata) => {
        console.log("tdata: "+JSON.stringify(tdata));
        setLoading(false);

        let items = [];

        for (var i=1; i<=tdata.numt; i++) {
          let index = i;
          let qdata = tdata["t"+i];
          items.push((
            <TableRow key={i}>
              <TableCell>{qdata.test_name}</TableCell>
              <TableCell>Score {qdata.score}/{qdata.numq}</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ));
        }

        setRows(items);
      });
    }
  }

  return (
    <div style={props.style}>
      <TableContainer id="mytests-table">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Score</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading?
            <TableRow>
              <TableCell colSpan={3}>
                <PropagateLoader loading={loading} />
              </TableCell>
            </TableRow>
            :<></>}

            {rows.slice(page*RPP, page*RPP+RPP)
              .map((test, index) => {
                return test;
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MytestsTable
