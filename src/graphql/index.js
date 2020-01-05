import gql from "graphql-tag";

export const GET_LINKS = gql`
  {
    getLinks {
      _id
      url
      name
      hash
      active
      createdBy
      updatedAt
    }
  }
`;

export const GET_LINK_URL = gql`
  query getLinkURL($hash: String!) {
    getLinkURL(input: { hash: $hash })
  }
`;

export const CREATE_LINK = gql`
  mutation createLink($url: String!, $name: String!) {
    createLink(input: { url: $url, name: $name }) {
      _id
      url
      name
      hash
      active
      createdBy
      updatedAt
    }
  }
`;

export const EDIT_LINK = gql`
  mutation editLink($_id: String!, $name: String!, $active: Boolean!) {
    editLink(input: { _id: $_id, name: $name, active: $active }) {
      _id
      url
      name
      hash
      active
      createdBy
      updatedAt
    }
  }
`;

export const DELETE_LINK = gql`
  mutation deleteLink($_id: String!) {
    deleteLink(input: { _id: $_id }) {
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
    }
  }
`;
