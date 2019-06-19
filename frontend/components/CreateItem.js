import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import multiUserInput from '../lib/reducer/multiUserInput';

const CreateItem = () => {
	const initialValue = {
		title: '',
		description: '',
		image: '',
		largeImage: '',
		price: 22,
	};
	const [userInput, handleChange] = multiUserInput(initialValue);
	const { title, price, description } = userInput;
	return (
			<Form onSubmit={(e) => {
				e.preventDefault()
				console.log(userInput)
			}}>
				<fieldset>
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
	);
};

export default CreateItem;
