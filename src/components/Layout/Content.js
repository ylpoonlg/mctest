import { Container, withStyles } from '@material-ui/core'
import React from 'react'
import theme from '../../theme/theme'

function Content({children, mt=1, style}) {
    return (
        <Container children={children}
            style={{
                textAlign: "center",
                marginTop: mt+"rem",
                backgroundColor: theme.palette.contentBackground,
                overflow: "auto",
                maxWidth: "60rem",
                paddingBottom: "2rem",
                ...style,
            }}>
        </Container>
    )
}

export default Content
