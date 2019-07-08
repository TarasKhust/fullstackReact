import React, { useReducer } from 'react';

export default initialValue => {
	const [userInput, setUserInput] = useReducer(
			(state, newState) => ({ ...state, ...newState }),
			initialValue,
	);
	const handleChange = evt => {
		const { name, value, type } = evt.target;
		const val = type === 'number' ? parseFloat(value) : value;
		setUserInput({ [name]: val });
	};
	const uploadFile = async e => {
		const url = `https://api.cloudinary.com/v1_1/dinfna4ih/image/upload`;
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sickfits');
		const res = await fetch(url, {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		const { eager, secure_url } = file;
		setUserInput({
			image: secure_url,
			largeImage: eager[0].secure_url
		});

	};
	const updateItems = async (e, updateItemMutation) => {
		e.preventDefault();
		console.log('Updating Item!!');
		const res = await updateItemMutation({
			variables: {
				id: id,
				...userInput,
			},
		});
		console.log('Updated!!');
	};
	return [userInput, handleChange, uploadFile, updateItems ];
}
