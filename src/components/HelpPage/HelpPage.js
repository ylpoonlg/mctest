import { Typography, Container } from '@material-ui/core';
import React from 'react';
import Content from '../Layout/Content';

function HelpPage() {
    return (
        <Content>
            <Typography variant="h4">Need Help Support?</Typography>
            <Container>
                <div className="section">
                    <h4>We're not offering any...</h4>
                </div>
            </Container>
        </Content>
    )
}

export default HelpPage
