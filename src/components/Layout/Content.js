import { Container, withStyles } from '@material-ui/core'
import React from 'react'
import theme from '../../theme/theme'

function Content({children}) {
    return (
        <Container children={children}
            style={{
                textAlign: "center",
                marginTop: "2rem",
                backgroundColor: theme.palette.contentBackground,
                overflow: "hidden",
                paddingLeft: "10%",
                paddingRight: "10%",
                paddingBottom: "2rem",
            }}>
        </Container>
    )
}

export default Content
