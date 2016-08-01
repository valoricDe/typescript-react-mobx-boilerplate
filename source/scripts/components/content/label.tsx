import * as React from 'react';

const Label: (props: Props.Content.ILabel) => JSX.Element = (props: Props.Content.ILabel): JSX.Element => {
	return <label className='content__output'>{props.value}</label>;
};

export default Label;
