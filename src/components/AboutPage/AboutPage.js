import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Content from '../Layout/Content'

function AboutPage() {
    return (
        <Content>
            <Typography variant="h4">About</Typography>
            <Container>
                <div className="section">
                    <h4>What is MC Test Tool</h4>
                    <p>
                        MC Test Tool is a tool that helps you record the results of your multiple-choice (MC) tests
                    </p>
                </div>

                <div className="section">
                    <h4>Version</h4>
                    <p>
                        v2.1.0 (dev)
                    </p>
                </div>

                <div className="section">
                    <h4>About Developer</h4>
                    <p>
                        MC Test Tool is developed by ylpoonlg
                        <br/>
                        Wisdom is given by mokkagod
                    </p>
                    <br/>
                    <h5>Bug Report</h5>
                    <p>
                        <a href="https://github.com/ylpoonlg/mctest">Github repo</a>
                    </p>
                </div>
            </Container>
        </Content>
    )
}

export default AboutPage
