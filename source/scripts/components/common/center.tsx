import * as React from 'react';

const Center: (props: Props.ICenter) => JSX.Element = (props: Props.ICenter): JSX.Element => {
	return (
		<div className='center'>
			<div className='group'>
				{props.children}
			</div>
		</div>
	);
};

export default Center;
