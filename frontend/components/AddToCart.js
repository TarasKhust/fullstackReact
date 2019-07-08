import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($id: ID!) {
        addToCart(id: $id) {
            id
            quantity
        }
    }
`;

const AddToCart = ({ id }) => {
  return (
    <Mutation
      mutation={ADD_TO_CART_MUTATION}
      variables={{
        id
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(addToCart, { loading }) => (
        <button disabled={loading} onClick={() => (
          addToCart().catch(err => {
            alert(err.message);
            Router.push({
              pathname: '/signup'
            });
          }
        ))}>
          Add{loading && 'ing'} To Cart 🛒
        </button>
      )}
    </Mutation>
  );
};
export default AddToCart;
export { ADD_TO_CART_MUTATION };
