	/**
	 * Created by velten on 23.10.16.
	 */
	import Relay from 'react-relay';
	import IQuestion = Props.Content.IQuestion;

	export default class UpdateQuestionMutation extends Relay.Mutation<any, any> {
		getMutation() {
			return Relay.QL `mutation { updateQuestion }`
		}

		getVariables() {
			return {
				id: this.props.store.id,
				questionPatch: this.getOptimisticResponse().question
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
				question: {
					rowId: this.props.store.rowId,
					title: this.props.store.title,
					description: this.props.store.description,
					author: undefined //TODO subcomponent holds author data //this.props.store.author.rowId,
				}
			}
		}
	}