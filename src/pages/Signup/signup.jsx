import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Segment, Message, Container } from "semantic-ui-react";

import { REGISTER_USER } from "../../graphql";
import { AuthContext } from "../../context/auth";
import { FormLayout, MessageList, PasswordMeter } from "../../components";

export default function Signup(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [addUser, { loading }] = useMutation(REGISTER_USER);
  const { register, handleSubmit, setValue, watch } = useForm();
  const password = watch("password");

  useEffect(() => {
    register({ name: "email", value: "" });
    register({ name: "username", value: "" });
    register({ name: "password", value: "" });
    register({ name: "confirmPassword", value: "" });
  }, [register]);

  const onChange = (_, { name, value }) => {
    setValue(name, value);
  };

  const onSubmit = values => {
    addUser({
      update(_, { data: { register: userData } }) {
        context.login(userData);
        props.history.push("/");
      },
      variables: values
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors.length > 0 && !networkError) {
        setErrors(graphQLErrors[0].extensions.exception.errors);
      } else {
        setErrors({ general: "Cannot communicate with server" });
      }
    });
  };

  return (
    <FormLayout heading="Create your account" logo="/images/logo_black.svg">
      <MessageList
        error
        itemIcon="warning circle"
        list={Object.values(errors)}
      />
      <Form
        noValidate
        size="large"
        onSubmit={handleSubmit(onSubmit)}
        className={loading ? "loading" : ""}
      >
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            type="text"
            label="Username"
            iconPosition="left"
            placeholder="Username"
            name="username"
            onChange={onChange}
            error={errors.username ? true : false}
          />
          <Form.Input
            fluid
            icon="envelope"
            type="text"
            label="Email"
            iconPosition="left"
            placeholder="Email"
            name="email"
            onChange={onChange}
            error={errors.email ? true : false}
          />
          <Form.Input
            fluid
            icon="lock"
            type="password"
            label="Password"
            iconPosition="left"
            placeholder="Password"
            name="password"
            onChange={onChange}
            error={errors.password ? true : false}
          />
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onChange}
            error={errors.confirmPassword ? true : false}
          />
          <Container className="field">
            <label>Password Strength</label>
            <PasswordMeter value={password} />
          </Container>
          <Button fluid color="black" size="large">
            Sign Up
          </Button>
        </Segment>
      </Form>
      <Message floating>
        <Container textAlign="center">
          Already have an account? <a href="/signin">Sign In</a>
        </Container>
      </Message>
    </FormLayout>
  );
}
