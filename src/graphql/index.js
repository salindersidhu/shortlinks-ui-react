import gql from 'graphql-tag';

export const GET_PUBLIC_LINKS = gql`
    {
        getPublicLinks {
            longURL
            shortURL
        }
    }
`;

export const GET_LINKS = gql`
    {
        getLinks {
            _id
            name
            active
            longURL
            shortURL
            createdBy
            updatedAt
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(
            input: {
                email: $email
                password: $password
            }
        ) {
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
