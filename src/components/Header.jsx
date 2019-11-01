import React, { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import {
    Icon,
    Menu,
    Image,
    Dropdown,
    Container
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function Header() {
    const client = useApolloClient();
    const { logout } = useContext(AuthContext);

    function clickLogout() {
        client.resetStore();
        logout();
    }

    return <Menu inverted borderless style={{ borderRadius: 0 }}>
        <Container>
            <Menu.Item as='a' header>
                <Image
                    size='mini'
                    src='/images/logo_white.svg'
                    style={{ marginRight: '1.5em' }}
                />
                Short Links
            </Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown pointing text='Account' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={clickLogout}>
                            <Icon name='arrow right' />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Container>
    </Menu>;
}

export default Header;
