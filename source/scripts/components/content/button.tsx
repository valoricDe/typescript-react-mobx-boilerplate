import React from 'react';

type TButton = (props: Props.Content.IButton) => JSX.Element;

const Button: TButton = (props: Props.Content.IButton): JSX.Element => {
	const { caption, type, onClick }: Props.Content.IButton = props;

	return (
		<button
			className={`content__button content__button--${type}`}
			onClick={onClick}>
			{caption}
		</button>
	);
};

export default Button;
