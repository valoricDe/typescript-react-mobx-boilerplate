import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Label extends React.Component<Props.Common.ILabel, {}> {
	public render(): JSX.Element {
		return <label className='output'>{this.props.tickStore.value}</label>;
	}
}
