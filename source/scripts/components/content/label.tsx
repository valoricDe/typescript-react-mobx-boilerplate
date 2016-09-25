import React from 'react';

type TLabel = (props: Props.Content.ILabel) => JSX.Element;

const Label: TLabel = (props: Props.Content.ILabel): JSX.Element => {
	return <label className='content__output'>{props.value}</label>;
};

export default Label;
