import * as React from 'react';
import {Component} from 'react';
import DevTools from 'mobx-react-devtools';
import { Button, Jumbotron } from 'react-bootstrap';

//import Content from './content';
import * as Relay from 'react-relay';
import {observer} from "mobx-react"; import IQuery = GQL.IQuery;
import relayNodeArray from "../../lib/relayNodeArray";
//import {RegisterUserState} from "../content/registerUser";


export class HomePageState {
	//registerUser = new RegisterUserState()
}

@observer
class HomePageClass extends Component<Props.IHomePageProps & {store: IQuery}, void> {
	public render(): JSX.Element {
		console.log('rendering HomePage');

		const tagEdges = this.props.store.allTags.edges;
		const favoriteTags = tagEdges.length ? relayNodeArray(tagEdges).filter(tag => tag.parent === null).sort((tA, tB) => tB.questionTagsByTag.totalCount > tA.questionTagsByTag.totalCount) : [];

		return (
			<div>
				<div>
					<h1>Hello, world!</h1>
					<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
					<p><Button bsStyle="primary">Learn more</Button></p>
				</div>
				{favoriteTags.length ?
					<div className="favoriteTags">
						{favoriteTags.map(tag => <div key={tag.id}>{tag.name}</div>)}
					</div> :
					null
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
            	allTags(first: 10000) {
                    edges {
                        node {
							id
							parent
                            name
                            questionTagsByTag { totalCount }
                        }	
					}
                }
			}`,
	},
});

export default HomePage;
