import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`;

const RequestReset = () => {
  const [state, setState] = useState({ email: '' });
  const saveState = e => {
    setState({ [e.target.name]: e.target.value });
  };
  const { email } = state;
  return (
    <Mutation mutation={REQUEST_RESET_MUTATION} variables={state}>
      {(reset, { error, loading, called }) => (
        <Form
          method="post"
          data-test="form"
          onSubmit={async e => {
            e.preventDefault();
            await reset();
            setState({ email: '' });
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Request a password reset</h2>
            <Error error={error}/>
            {!error && !loading && called &&
            <p>Success! Check your email for a reset link!</p>}
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={saveState}
              />
            </label>

            <button type="submit">Request Reset!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
