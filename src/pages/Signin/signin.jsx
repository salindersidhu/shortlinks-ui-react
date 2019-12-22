import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import {
    Form,
    Button,
    Segment,
    Message,
    Container
} from 'semantic-ui-react';

import { useForm } from '../../hooks';
import { LOGIN_USER } from '../../graphql';
import { AuthContext } from '../../context/auth';
import { FormLayout, MessageList } from '../../components';

export default function Signin(props) {
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

    return (
        <FormLayout
            heading='Sign in to your account'
            logo='/images/logo_black.svg'
        >
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
                        icon='envelope'
                        type='text'
                        label='Email'
                        iconPosition='left'
                        placeholder='Email'
                        name='email'
                        onChange={onChange}
                        value={values.email}
                        error={errors.email ? true : false}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        type='password'
                        label='Password'
                        iconPosition='left'
                        placeholder='Password'
                        name='password'
                        onChange={onChange}
                        value={values.password}
                        error={errors.password ? true : false}
                    />
                    <Button fluid color='black' size='large'>
                        Sign In
                    </Button>
                </Segment>
            </Form>
            <Message floating>
                <Container textAlign='center'>
                    New to Short Links? <a href='/signup'>Sign Up</a>
                </Container>
            </Message>
        </FormLayout>
    );
}
