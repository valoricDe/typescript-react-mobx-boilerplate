/**
 * Created by velten on 23.10.16.
 */
import * as Relay from 'react-relay';

export default class UpdateQuestionMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL `mutation { updateQuestion }`
	}

	getVariables() {
		console.log('UpdateQuestionMutation', this.props);
		return {
			id: this.props.store.id,
			questionPatch: this.props.patch
		}
	}

	getFatQuery() {
		return Relay.QL `fragment on UpdateQuestionPayload { question }`
	}

	getConfigs() {
		return [{
			type: "FIELDS_CHANGE",
			fieldIDs: {
				question: this.props.store.id
			}
		}]
	}

	getOptimisticResponse() {
		return {
			store: this.props.patch
		}
	}

	// This mutation has a hard dependency on the question's ID. We specify this
	// dependency declaratively here as a GraphQL query fragment. Relay will
	// use this fragment to ensure that the question's ID is available wherever
	// this mutation is used.
	static fragments = {
		store: () => Relay.QL`
		  fragment on Question {
			id
		  }
    	`,
	};
}