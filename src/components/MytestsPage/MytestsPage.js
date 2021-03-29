import { Typography } from '@material-ui/core'
import React from 'react'
import Content from '../Layout/Content'
import MytestsTable from './MytestsTable'

function MytestsPage() {
    return (
        <Content>
            <Typography variant="h4">My Tests</Typography>
            <MytestsTable style={{marginTop: "1.2rem", minHeight: "50vh"}} />
        </Content>
    )
}

export default MytestsPage
