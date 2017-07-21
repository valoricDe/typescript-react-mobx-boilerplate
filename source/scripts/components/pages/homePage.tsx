import * as React from 'react';
import {Component} from 'react';
import DevTools from 'mobx-react-devtools';
import { Button, Jumbotron } from 'reactstrap';

//import Content from './content';
import * as Relay from 'react-relay';
import {observer} from "mobx-react"; import IQuery = GQL.IQuery;
import relayNodeArray from "../../lib/relayNodeArray";
import Card from 'reactstrap/lib/Card';
import Link from "react-router/lib/Link";
//import {RegisterUserState} from "../content/registerUser";

import "../../../styles/components/homepage.scss";

export class HomePageState {
	//registerUser = new RegisterUserState()
}

@observer
class HomePageClass extends Component<Props.IHomePageProps & {store: IQuery}, void> {
	public render(): JSX.Element {
		console.log('rendering HomePage');

		const tagEdges = this.props.store.allTags.edges;
		const favoriteTags = tagEdges.length ? relayNodeArray(tagEdges).sort((tA, tB) => tB.questionTagXrefsByTagId.totalCount - tA.questionTagXrefsByTagId.totalCount) : [];

		return (
			<div>
				<div>
					<h1>Hello, world!</h1>
					<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
					<p><Button color="primary">Learn more</Button></p>
				</div>
				<h3>Most favorite tags: </h3>
				{favoriteTags.length ?
					<div className="homepage-grid">
						{favoriteTags.map(tag =>
							<Card block key={tag.id}>
								<Link to={"/tags/"+tag.rowId}>{tag.identifier}</Link>
								<small>({tag.questionTagXrefsByTagId.totalCount} usages)</small>
							</Card>)}
					</div> :
					<p>No tags.</p>
				}
			</div>
		);
	};
}

const HomePage = Relay.createContainer(HomePageClass, {
	initialVariables: {
		parent: null
	},
	prepareVariables: vars => {
		return vars;
	},
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: () => Relay.QL`
    		fragment on Query {
				currentUser
            	allTags(first: 20) {
                    edges {
                        node {
							id
                            rowId
							parent
                            identifier
                            questionTagXrefsByTagId { totalCount }
                        }	
					}
                }
			}`,
	},
});

export default HomePage;
