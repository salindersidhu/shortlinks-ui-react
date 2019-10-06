import React, { useState } from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment
} from 'semantic-ui-react';

function Login() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    
    const onChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
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
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={onSubmit} noValidate>
                    <Segment stacked>
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
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to Shortlinks? <a href='/signup'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;
