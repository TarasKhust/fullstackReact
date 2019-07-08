import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import multiUserInput from '../lib/reducer/multiUserInput';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`;
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
        updateItem(id: $id, title: $title, description: $description, price: $price) {
            id
            title
            description
            price
        }
    }
`;

const UpdateItem = ({ id }) => {
  const [userInput, handleChange] = multiUserInput({});
  const updateItems = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('Updating Item!!');
    console.log(userInput);
    const res = await updateItemMutation({
      variables: {
        id: id,
        ...userInput
      }
    });
    console.log('Updated!!');
  };

  return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id: id
      }}
    >
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {id}</p>;
        const { title, price, description } = data.item;
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={userInput}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={e => {
                updateItems(e, updateItem);
                Router.push({
                  pathname: '/items'
                });
              }}>
                <Error error={error}/>
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={title}
                      onChange={handleChange}
                    />
                  </label>

                  <label htmlFor="price">
                    Price
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      defaultValue={price}
                      onChange={handleChange}
                    />
                  </label>

                  <label htmlFor="description">
                    Description
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter A Description"
                      required
                      defaultValue={description}
                      onChange={handleChange}
                    />
                  </label>
                  <button type="submit">Sav{loading ?
                    'ing' :
                    'e'} Changes
                  </button>
                </fieldset>
              </Form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
