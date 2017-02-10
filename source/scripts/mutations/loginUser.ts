/**
 * Created by velten on 23.10.16.
 */
import * as Relay from 'react-relay';

export default class LoginUserMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL`mutation { authenticate }`;
	}

	getVariables() {
		return {
			email: this.props.email,
			password: this.props.password,
		};
	}

	getFatQuery() {
		return Relay.QL`
      fragment on AuthenticatePayload {
        jwtToken
      }
    `;
	}

	getConfigs() {
		return [{
			type: 'REQUIRED_CHILDREN',
			// Forces these fragments to be included in the query
			children: [Relay.QL`
			  fragment on AuthenticatePayload {
				jwtToken
			  }
			`],
		}];
	}
}