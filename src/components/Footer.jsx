import React from 'react';
import {
    List,
    Image,
    Segment,
    Container
} from 'semantic-ui-react';

function Footer() {
    return <Segment
        vertical
        inverted
        style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
    >
        <Container textAlign='center'>
            <Image centered size='mini' src='/images/logo_white.svg' />
            <List horizontal inverted divided link size='small'>
                <List.Item as='a' href='#'>
                    Site Map
                </List.Item>
                <List.Item as='a' href='#'>
                    Contact Us
                </List.Item>
                <List.Item as='a' href='#'>
                    Terms and Conditions
                </List.Item>
                <List.Item as='a' href='#'>
                    Privacy Policy
                </List.Item>
            </List>
        </Container>
    </Segment>;
}

export default Footer;
