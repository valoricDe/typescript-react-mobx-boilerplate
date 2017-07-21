import * as React from 'react';
import {Component} from 'react';
import * as Relay from 'react-relay';
import {Input} from "formsy-react-components";
import Formsy from 'formsy-react';
import TagBox from "./tagBox";
import {routedOnClick} from "../../lib/routerClickHelper";

import "../../../styles/components/tagList.scss";

export class TagListClass extends Component<Props.ITagListProps, void> {

	public render(): JSX.Element {
		const query = this.props.relay.variables.query;
		const querySearch = !!this.props.store.searchTags;
		const tags = this.props.store.searchTags || this.props.store.allTags || this.props.store.children;

		const title =
				(!!this.props.store.searchTags ? 'Tags with "'+query+'" in title or description' : false) ||
				(!!this.props.store.children ? 'Sub-Tags' : false) ||
				'Newest Tags';

		let items = tags.edges.map(
			(edge, idx) => <TagBox store={edge.node} user={this.props.store} key={idx} />
		);

		return (
			<div>
				<h2 className="page-header">{title}</h2>
				{ items.length ?
					<div>
						<Formsy.Form className="col-md-4 input-group float-right" onValidSubmit={(item) => this.props.relay.setVariables({query: item.query})}>
							<Input label="Search for: " name="query" value="" layout="elementOnly" />
							<span className="input-group-btn">
								<input type="submit" className="btn btn-default btn-group" name="submit_search" value="Search" />
							</span>
						</Formsy.Form>
						<p></p>
						<div className="tagList-list">
							{ items }
						</div>
						<p>Showing {tags.length} of {tags.totalCount} tags</p>
					</div>
					:
					<p>No tags found.</p>
				}
			</div>
		);
	};
};

const TagList = Relay.createContainer(TagListClass, {
	initialVariables: {
		query: null,
		first: 20,
	},
	prepareVariables: vars => {
		vars['queryIsTruthy'] = !!vars['query'];
		return vars;
	},
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: (vars) => {
			return Relay.QL`
    		fragment on Query {
    			searchTags(search: $query, first: $first) @include(if: $queryIsTruthy) {
    				totalCount
					edges {
						node {
							${TagBox.getFragment('store')}
						}
					}
    			}
				allTags(first: $first) {
					totalCount
					edges {
						node {
							${TagBox.getFragment('store')}
						}
					}
				}
			}`
		},
	},
});

export default TagList;

const TagChildrenList = Relay.createContainer(TagListClass, {
	initialVariables: {
		first: 20,
	},
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: (vars) => {
			return Relay.QL`
    		fragment on Tag {
    			children(first:$first) {
    				totalCount
					edges {
						node {
							${TagBox.getFragment('store')}
						}
					}
				}
			}`
		},
	},
});

export {TagChildrenList};
