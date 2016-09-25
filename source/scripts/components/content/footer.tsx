import React from 'react';

type TFooter = () => JSX.Element;

const Footer: TFooter = (): JSX.Element => {
	return (
		<div className='content__footer'>
			<label>The project is successfully built.</label>
		</div>
	);
};

export default Footer;
