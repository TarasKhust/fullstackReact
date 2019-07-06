import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import multiUserInput from '../lib/reducer/multiUserInput';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
mutation CREATE_ITEM_MUTATION(
		$title: String!
	  $description: String!
	  $image: String
	  $largeImage: String
	  $price: Int!
	  ) 
  {
		createItem(
        title: $title
        description: $description
        image: $image
        largeImage: $largeImage
        price: $price
				
		) {
			id
}
}
`;

const CreateItem = () => {
	const initialValue = {
		title: '',
		description: '',
		image: '',
		largeImage: '',
		price: 22,
	};
	const [userInput, handleChange, uploadFile] = multiUserInput(initialValue);

	const { title, price, description, image } = userInput;
	return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={userInput}>
				{(createItem, { loading, error }) => (
						<Form data-test="form"
							onSubmit={async e => {
							e.preventDefault();
							const res = await createItem();
							const { data } = res;
							Router.push({
								pathname: '/items',
								query: { id: data.createItem.id },
							});
						}}>
							<Error error={error}/>
							<fieldset disabled={loading} aria-busy={loading}>
								<label htmlFor="file">
								Image
								<input type="file"
								       id="file"
								       name="file"
								       placeholder="Upload an image"
								       required
								       onChange={uploadFile}
								/>
									{image && (
											<img width="200" src={image} alt="Upload Preview" />
									)}
							</label>
								<label htmlFor="title">
									Title
									<input type="text"
									       id="title"
									       name="title"
									       placeholder="Title"
									       value={title}
									       required={title}
									       onChange={handleChange}
									/>
								</label>
								<label htmlFor="price">
									Price
									<input type="number"
									       id="price"
									       name="price"
									       placeholder="Price"
									       value={price}
									       required={price}
									       onChange={handleChange}
									/>
								</label>
								<label htmlFor="description">
									Description
									<textarea type="text"
									          id="description"
									          name="description"
									          placeholder="Description"
									          value={description}
									          required={description}
									          onChange={handleChange}
									/>
								</label>
								<button type="submit">Submit</button>
							</fieldset>
						</Form>
				)
				}
			</Mutation>
	);
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
