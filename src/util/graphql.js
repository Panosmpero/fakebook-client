import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      likesCount
      commentsCount
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
      loginInput: {
        username: $username, password: $password
      } 
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;