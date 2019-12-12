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
import { REGISTER_USER } from '../graphql';
import { AuthContext } from '../context/auth';
import { MessageList, PasswordMeter } from '../components';

function Signup(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [addUser, { loading }] = useMutation(REGISTER_USER);
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    function registerUserCallback() {
        addUser({
            update(_, { data: { register: userData } }) {
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
                    Create your account
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
                            name='username'
                            placeholder='Username'
                            icon='user'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.username}
                            error={errors.username ? true : false}
                        />
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
                        <Form.Input
                            fluid
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            icon='lock'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                        />
                        <PasswordMeter value={values.password} />
                        <Button fluid color='black' size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message floating>
                    Already have an account? <a href='/login'>Log In</a>
                </Message>
            </Grid.Column>
        </Grid>
    </Container>;
}

Signup.propTypes = {
    history: PropTypes.object
};

export default Signup;
