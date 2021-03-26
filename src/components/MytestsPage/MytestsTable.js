import React, { useState } from 'react';
import { makeStyles, Table, Button,
  TableBody, TableCell, TableContainer, TablePagination,
  TableHead, TableRow } from '@material-ui/core';
import PropagateLoader from 'react-spinners/PropagateLoader';

import * as db from '../../firebase/db';
import './mytests.css';
import TitleSelect from '../ResultPage/TitleSelect';
import MytestsFilter from './MytestsFilter';

const styles = makeStyles((theme) => ({
  
}));

function MytestsTable(props) {
  const classes = styles();

  const NUM_COL = 3;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [RPP, setRPP] = useState(100); // Rows Per Page
  const [rows, setRows] = useState([]);
  getTests(); // Load from database

  /*tdata format: {"numt": 3, "t1": {...}, "t2": {...}, "t3": {...}}*/
  function getTests() {
    // DEBUG
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setRows(getRows());
      }, 1000);
    }
    return;
    // END

    if (loading) {
      db.getMytests((tdata) => {
        console.log("tdata: "+JSON.stringify(tdata));
        setLoading(false);
        setRows(getRows(tdata));
      });
    }
  }

  function getRows(tdata) {
    tdata = JSON.parse(localStorage.mc_tdata);

    let items = [];
    for (var i=1; i<=tdata.numt; i++) {
      let index = i;
      let qdata = tdata["t"+i];
      items.push((
        <TableRow key={i}>
          <TableCell>
            <a className="test-link">{qdata.test_name}</a>
          </TableCell>
          <TableCell>Score {qdata.score}/{qdata.numq}</TableCell>
          <TableCell>...</TableCell>
        </TableRow>
      ));
    }
    return items;
  }

  return (
    <div style={props.style}>
      <TableContainer id="mytests-table">
        <Table size="small" style={{ widgth: "100%" }}>
          <TableHead>
            {/* Header: Filter&Sorting */}
            <TableRow>
              <TableCell colSpan={NUM_COL}>
                <MytestsFilter />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Score</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading?
            <TableRow style={{height: "3rem"}}>
              <TableCell colSpan={NUM_COL}>
                <div className="row" style={{ paddingBottom: "1rem" }}>
                  <PropagateLoader loading={loading} />
                </div>
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

export default MytestsTable
