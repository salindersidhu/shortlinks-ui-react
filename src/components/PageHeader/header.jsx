import React, { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Icon, Menu, Image, Dropdown, Container } from 'semantic-ui-react';

import './header.scss';
import { AuthContext } from '../../context/auth';

export default function Header() {
    const client = useApolloClient();
    const { logout } = useContext(AuthContext);

    function clickLogout() {
        client.resetStore();
        logout();
    }

    return (
        <Menu inverted borderless className='no-border'>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/images/logo_white.svg' className='img-mr'/>
                    Short Links
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown pointing text='Account' className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={clickLogout}>
                                <Icon name='sign-out' />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}
