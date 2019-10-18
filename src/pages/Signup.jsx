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
import gql from 'graphql-tag';

import { useForm } from '../hooks';
import { AuthContext } from '../context/auth';
import PasswordMeter from '../components/PasswordMeter';

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            input: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            token
        }
    }
`;

function Signup(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUserCallback() {
        addUser();
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
                    Create your account
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
                            icon='user'
                            type='text'
                            iconPosition='left'
                            name='username'
                            onChange={onChange}
                            value={values.username}
                            error={errors.username ? true : false}
                            placeholder='Username'
                        />
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
                        <PasswordMeter value={values.password} />
                        <Form.Input
                            fluid
                            icon='lock'
                            type='password'
                            iconPosition='left'
                            name='confirmPassword'
                            onChange={onChange}
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            placeholder='Confirm Password'
                        />
                        <Button
                            fluid
                            color='black'
                            size='large'
                        >
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message color='yellow'>
                    Already have an account? <a href='/login'>Login</a>
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

Signup.propTypes = {
    history: PropTypes.object
};

export default Signup;
