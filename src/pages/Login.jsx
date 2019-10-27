import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    List,
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment
} from 'semantic-ui-react';

import { useForm } from '../hooks';
import { LOGIN_USER } from '../graphql';
import { AuthContext } from '../context/auth';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [loginUser, { loading }] = useMutation(LOGIN_USER);
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    });

    function loginUserCallback() {
        loginUser({
            update(_, { data: { login: userData } }) {
                context.login(userData);
                props.history.push('/');
            },
            variables: values
        }).catch(err => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        });
    }

    return (
        <Grid
            textAlign='center'
            verticalAlign='middle'
            style={{ height: '100vh' }}
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='black' textAlign='center'>
                    <Image src='/public/logo_black.svg'/>
                    Log in to your account
                </Header>
                {Object.keys(errors).length > 0 && (
                    <Message error>
                        <List>
                            {Object.values(errors).map((value) => (
                                <List.Item key={value}>
                                    <List.Icon name='warning circle'/>
                                    <List.Content style={{ textAlign: 'left' }}>
                                        <b>{value}</b>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </Message>
                )}
                <Form
                    noValidate
                    size='large'
                    onSubmit={onSubmit}
                    className={loading ? 'loading' : ''}
                >
                    <Segment stacked>
                        <Form.Input
                            fluid
                            type='text'
                            name='email'
                            placeholder='Email'
                            icon='envelope'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.email}
                            error={errors.email ? true : false}
                        />
                        <Form.Input
                            fluid
                            type='password'
                            name='password'
                            placeholder='Password'
                            icon='lock'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.password}
                            error={errors.password ? true : false}
                        />
                        <Button fluid color='black' size='large'>Login</Button>
                    </Segment>
                </Form>
                <Message floating>
                    New to Short Links? <a href='/signup'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

Login.propTypes = {
    history: PropTypes.object
};

export default Login;
