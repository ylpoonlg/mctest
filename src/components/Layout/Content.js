import { Container, withStyles } from '@material-ui/core'
import React from 'react'
import theme from '../../theme/theme'

function Content({children, mt=2}) {
    return (
        <Container children={children}
            style={{
                textAlign: "center",
                marginTop: mt+"rem",
                backgroundColor: theme.palette.contentBackground,
                overflow: "hidden",
                //paddingLeft: "10%",
                //paddingRight: "10%",
                maxWidth: "60rem",
                paddingBottom: "2rem",
            }}>
        </Container>
    )
}

export default Content
