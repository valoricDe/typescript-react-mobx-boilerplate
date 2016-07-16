import * as React from 'react';

const Button: (props: Props.Common.IButton) => JSX.Element = (props: Props.Common.IButton): JSX.Element => {
	return (
		<button className='flat' {...props}>Click</button>
	);
};

export default Button;
