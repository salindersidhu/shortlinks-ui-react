import React from 'react';
import { List, Image, Segment, Container } from 'semantic-ui-react';
import './footer.scss';

export default function Footer() {
    return (
        <Segment vertical inverted className='page-footer'>
            <Container textAlign='center'>
                <Image centered src='/images/logo_white.svg' size='mini'/>
                <List inverted horizontal divided link size='small'>
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
        </Segment>
    );
}
