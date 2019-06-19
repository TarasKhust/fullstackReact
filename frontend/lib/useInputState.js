import { useState } from 'react';

export default initialValue => {
	const [value, setValue] = useState(initialValue);
	const handleChange = evt => {
		const { name, type, value } = evt.target;
		const val = type === 'number' ? parseFloat(value) : value;
		setValue(value);
		console.log(name)
	};
	const reset = () => {
		setValue('');
	};
	return [value, handleChange, reset];
};
