import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import { Popover} from 'reactstrap';

class TagTokenComponent extends Component<Props.ITagProps, void> {
	getDetails = () => {
		this.props.relay.setVariables({details: true})

	};

	public render(): JSX.Element {
		const store = this.props.store;

		/*const popover = <Popover id="popover-contained" title={"Tag: "+store.name}>
			{this.props.relay.pendingVariables && this.props.relay.pendingVariables.hasOwnProperty('details')?
				<p>Loading details</p>:
				<div>
					<p>{store.description}</p>
					<p>This tag has been used in {store.questionTagsByTag ? store.questionTagsByTag.totalCount : 'no'} question(s) yet.</p>
				</div>
			}
		</Popover>;*/

		return (
			//<OverlayTrigger trigger="click" placement="right" overlay={popover}>
				<span onClick={this.getDetails} className="token token-selected">{store.name}</span>
			//</OverlayTrigger>
		);
	}
}

const TagToken = Relay.createContainer(TagTokenComponent, {
	initialVariables: {
		details: null
	},
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
            fragment on Tag {
                name
                description @include(if: $details)
                questionTagXrefsByTagId @include(if: $details) {
                    totalCount
                }
            }`,
	},
});

export default TagToken;