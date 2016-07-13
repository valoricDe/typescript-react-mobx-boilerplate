import * as React from 'react';

const Label = (props: Props.ILabel): JSX.Element => {
	return (
		<label className='output'>{props.value}</label>
	);
};

export default Label;
