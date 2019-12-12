import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Form,
    Grid,
    Image,
    Button,
    Header,
    Message,
    Segment,
    Container
} from 'semantic-ui-react';

import { useForm } from '../hooks';
import { LOGIN_USER } from '../graphql';
import { AuthContext } from '../context/auth';
import { MessageList } from '../components';

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
        }).catch(({ graphQLErrors, networkError }) => {
            if (graphQLErrors.length > 0 && !networkError) {
                setErrors(graphQLErrors[0].extensions.exception.errors);
            } else {
                setErrors({ general: 'Cannot connect with server' });
            }
        });
    }

    return <Container>
        <Grid
            textAlign='center'
            verticalAlign='middle'
            style={{ height: '100vh' }}
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image
                    size='tiny'
                    verticalAlign='middle'
                    src='/images/logo_black.svg'
                />
                <Header
                    as='h1'
                    color='black'
                    textAlign='center'
                    style={{ marginTop: 0 }}
                >
                    Log in to your account
                </Header>
                <MessageList
                    error
                    itemIcon='warning circle'
                    list={Object.values(errors)}
                />
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
    </Container>;
}

Login.propTypes = {
    history: PropTypes.object
};

export default Login;
