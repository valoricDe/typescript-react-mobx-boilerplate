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

		let items = tags.edges.map(
			(edge, idx) => <TagBox store={edge.node} user={this.props.store} key={idx} />
		);

		return (
			<div>
				<h2 className="page-header">{querySearch ? 'Tags with "'+query+'" in title or description' : 'Newest Tags'}</h2>
				<Formsy.Form className="col-md-4 input-group float-right" onValidSubmit={(item) => this.props.relay.setVariables({query: item.query})}>
					<Input label="Search for: " name="query" value="" layout="elementOnly" />
					<span className="input-group-btn">
						<input type="submit" className="btn btn-default btn-group" name="submit_search" value="Search" />
					</span>
				</Formsy.Form>
				<p>&nbsp;</p>
				<div className="tagGrid-grid">
				{ items }
				</div>
				<p>With a total of {tags.totalCount}</p>
			</div>
		);
	};
};

const TagList = Relay.createContainer(TagListClass, {
	initialVariables: {
		query: null
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
    			searchTags(search: $query, first: 20) @include(if: $queryIsTruthy) {
    				totalCount
					edges {
						node {
							${TagBox.getFragment('store')}
						}
					}
    			}
				allTags(first: 20) {
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
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: (vars) => {
			return Relay.QL`
    		fragment on Tag {
    			children(first:20) {
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
