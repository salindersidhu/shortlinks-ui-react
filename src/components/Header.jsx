import React, { useContext } from 'react';
import {
    Container,
    Dropdown,
    Image,
    Menu
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function Header() {
    const { logout } = useContext(AuthContext);
    return (
        <Menu fixed='top' inverted borderless>
            <Container>
                <Menu.Item as='a' header>
                    <Image
                        size='mini'
                        src='/public/logo_white.svg'
                        style={{ marginRight: '1.5em' }}
                    />
                    Short Links
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown
                        pointing
                        text='Account'
                        className='link item'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={logout}
                            >
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}

export default Header;
