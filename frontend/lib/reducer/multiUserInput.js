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
	return [userInput, handleChange];
}
