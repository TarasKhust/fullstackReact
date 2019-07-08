import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import multiUserInput from '../lib/reducer/multiUserInput';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

const Signup = () => {
  const state = {
    name: '',
    email: '',
    password: ''
  };
  const [userInput, handleChange ] = multiUserInput(state);

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={userInput}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            await signup();
            handleChange({ name: '', email: '', password: '' });
            Router.push({
              pathname: '/items'
            });
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Up for An Account</h2>
            <Error error={error}/>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="name"
                value={state.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Sign Up!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
