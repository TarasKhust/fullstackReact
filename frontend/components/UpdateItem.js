import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import multiUserInput from '../lib/reducer/multiUserInput';
import Error from './ErrorMessage';

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
	console.log(id)
	const [userInput, handleChange, updateItems] = multiUserInput({});

	return (
			<Query query={SINGLE_ITEM_QUERY} variables={{
				id: id,
			}}>
				{({ data, loading }) => {
					if (loading) return  <p>Loading...</p>;
					if (!data.item) return  <p>No item Found for ID {id}</p>;
					return (
							<Mutation mutation={UPDATE_ITEM_MUTATION} variables={userInput}>
								{(updateItem, { loading, error }) => (
										<Form onSubmit={e => updateItems(e, updateItem)}>
											<Error error={error}/>
											<fieldset disabled={loading} aria-busy={loading}>
												<label htmlFor="title">
													Title
													<input type="text"
													       id="title"
													       name="title"
													       placeholder="Title"
													       defaultValue={data.item.title}
													       required
													       onChange={handleChange}
													/>
												</label>
												<label htmlFor="price">
													Price
													<input type="number"
													       id="price"
													       name="price"
													       placeholder="Price"
													       value={data.item.price}
													       required
													       onChange={handleChange}
													/>
												</label>
												<label htmlFor="description">
													Description
													<textarea type="text"
													          id="description"
													          name="description"
													          placeholder="Description"
													          defaultValue={data.item.description}
													          required
													          onChange={handleChange}
													/>
												</label>
												<button type="submit">Save Chanches</button>
											</fieldset>
										</Form>
								)
								}
							</Mutation>
					);
				}}
			</Query>

	);
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
