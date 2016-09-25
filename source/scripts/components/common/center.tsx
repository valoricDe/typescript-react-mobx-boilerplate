import React from 'react';

type TCenter = (props: Props.Common.ICenter) => JSX.Element;

const Center: TCenter = (props: Props.Common.ICenter): JSX.Element => {
	return (
		<div className='center'>
			<div>
				{props.children}
			</div>
		</div>
	);
};

export default Center;
