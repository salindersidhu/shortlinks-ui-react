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
    Segment,
} from 'semantic-ui-react';

import { useForm } from '../hooks';
import { LOGIN_USER } from '../graphql';
import { AuthContext } from '../context/auth';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    });
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }
    
    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                    <Image src='/public/logo_black.svg'/>
                    Log-in to your account
                </Header>
                <Form
                    size='large'
                    onSubmit={onSubmit}
                    className={loading ? 'loading' : ''}
                    noValidate
                >
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='envelope'
                            type='text'
                            iconPosition='left'
                            name='email'
                            onChange={onChange}
                            value={values.email}
                            error={errors.email ? true : false}
                            placeholder='Email'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            type='password'
                            iconPosition='left'
                            name='password'
                            onChange={onChange}
                            value={values.password}
                            error={errors.password ? true : false}
                            placeholder='Password'
                        />
                        <Button
                            fluid
                            color='black'
                            size='large'
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message color='yellow'>
                    New to Short Links? <a href='/signup'>Sign Up</a>
                </Message>
                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <List>
                            {Object.values(errors).map((value) => (
                                <List.Item key={value}>
                                    <List.Icon name='warning circle' />
                                    <List.Content 
                                        style={{ textAlign: 'left' }}
                                    >{value}</List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </div>
                )}
            </Grid.Column>
        </Grid>
    );
}

Login.propTypes = {
    history: PropTypes.object
};

export default Login;
