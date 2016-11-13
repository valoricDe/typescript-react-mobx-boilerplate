/**
 * Created by velten on 23.10.16.
 */
import Relay from 'react-relay';

export default class RegisterUserMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL `mutation { registerUser }`
	}

	getVariables() {
		return {
			firstName: this.props.newItem.firstName,
			lastName: this.props.newItem.lastName,
			username: this.props.newItem.username,
			email: this.props.newItem.email,
			password: this.props.newItem.password,
		}
	}

	getFatQuery() {
		return Relay.QL `fragment on RegisterUserPayload {
			user
		}`
	}

	getConfigs() {
		console.log('RegisterUserMutation', this.props);

		return [{
			type: 'REQUIRED_CHILDREN',
			// Forces these fragments to be included in the query
			children: [Relay.QL`
			  fragment on RegisterUserPayload {
				user
			  }
			`],
		}]
	}

	/*getOptimisticResponse() {
		return {
			questionEdge: {
				node: {
					title: this.props.newItem.title,
					description: this.props.newItem.description,
					author: this.props.store.user.id,
					userByAuthor: this.props.store.user
				},
			},
			query: {
				allQuestions: {
					totalCount: this.props.store.allQuestions.totalCount + 1,
					edges:
				}
			},
		};
	}*/
}