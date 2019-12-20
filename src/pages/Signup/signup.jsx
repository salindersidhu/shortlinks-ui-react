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
import { REGISTER_USER } from '../../graphql';
import { AuthContext } from '../../context/auth';
import { PageLayoutForm, MessageList, PasswordMeter } from '../../components';

export default function Signup(props) {
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

    return (
        <PageLayoutForm
            heading='Create your account'
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
                        icon='user'
                        type='text'
                        label='Username'
                        iconPosition='left'
                        placeholder='Username'
                        name='username'
                        onChange={onChange}
                        value={values.username}
                        error={errors.username ? true : false}
                    />
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
                    <Form.Input
                        fluid
                        icon='lock'
                        type='password'
                        iconPosition='left'
                        label='Confirm Password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={onChange}
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                    />
                    <Container className='field'>
                        <label>Password Strength</label>
                        <PasswordMeter value={values.password} />
                    </Container>
                    <Button fluid color='black' size='large'>
                        Sign Up
                    </Button>
                </Segment>
            </Form>
            <Message floating>
                <Container textAlign='center'>
                    Already have an account? <a href='/signin'>Sign In</a>
                </Container>
            </Message>
        </PageLayoutForm>
    );
}
