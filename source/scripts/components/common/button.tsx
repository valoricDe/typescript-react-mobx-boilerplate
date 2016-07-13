import * as React from 'react';

const Button: (props: Props.IButton) => JSX.Element = (props: Props.IButton): JSX.Element => {
	return (
		<button className='flat' {...props}>Click</button>
	);
};

export default Button;
