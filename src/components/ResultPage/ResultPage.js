import { Typography } from '@material-ui/core'
import React from 'react'
import Content from '../Layout/Content'
import ResultTable from './ResultTable'

function ResultPage() {
  return (
    <Content>
      <Typography variant="h4">Result</Typography>
      <ResultTable score="45/45" ttime="00:00:00.00"
        style={{maxWidth: "50rem", minWidth: "15rem", margin: "1rem auto",}}
      />
    </Content>
  )
}

export default ResultPage
