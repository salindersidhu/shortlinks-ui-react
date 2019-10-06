import React, { useState } from 'react';
import {useMutation} from '@apollo/react-hooks';
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment
} from 'semantic-ui-react';
import gql from 'graphql-tag';

const CREATE_USER = gql`
    mutation createUser(
        $name: String!,
        $email: String!,
        $password: String!
        ){
        createUser(input: {
            name: $name
            email: $email,
            password: $password
        }) {
            name
        }
    }
`

function Signup() {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [addUser, {loading}] = useMutation(CREATE_USER, {
        update(proxy, result){
            console.log(result);
        },
        variables: formValues
    });

	const onChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
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
                    <Image src='/public/logo.svg'/>
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
                            name='name'
                            onChange={onChange}
                            value={formValues.name}
                            placeholder='User Name'
                        />
                        <Form.Input
                            fluid
                            icon='envelope'
                            type='text'
                            iconPosition='left'
                            name='email'
                            onChange={onChange}
                            value={formValues.email}
                            placeholder='E-mail Address'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            type='password'
                            iconPosition='left'
                            name='password'
                            onChange={onChange}
                            value={formValues.password}
                            placeholder='Password'
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
                <Message>
                    Already have an account? <a href='/login'>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Signup;
