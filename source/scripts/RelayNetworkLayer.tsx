/**
 * Created by velten on 06.11.16.
 */
import { DefaultNetworkLayer } from 'react-relay';
import fetchWithRetries from "./lib/fetchWithRetries";
//import fetchWithRetries from "fbjs/lib/fetchWithRetries";

/**
 * Formats an error response from GraphQL server request.
 */
function defaultFormatErrors(request, errors): string {
	const CONTEXT_BEFORE = 20;
	const CONTEXT_LENGTH = 60;

	const queryLines = request.getQueryString().split('\n');
	return errors.map(({ locations, message }, ii) => {
		const prefix = (ii + 1) + '. ';
		const indent = ' '.repeat(prefix.length);

		// custom errors thrown in graphql-server may not have locations
		const locationMessage = locations ?
			('\n' + locations.map(({ column, line }) => {
				const queryLine = queryLines[line - 1];
				const offset = Math.min(column - 1, CONTEXT_BEFORE);
				return [
					queryLine.substr(column - 1 - offset, CONTEXT_LENGTH),
					' '.repeat(offset) + '^^^',
				].map(messageLine => indent + messageLine).join('\n');
			}).join('\n')) :
			'';

		return prefix + message + locationMessage;
	}).join('\n');
}

export default class RelayNetworkLayer extends DefaultNetworkLayer {
	sendQueries(requests: Array<RelayQueryRequest>) {
		return Promise.all(requests.map(request => (
			this._sendQuery(request).then(
				result => result.json()
			).then(payload => {
				let error: any = null;

				if (payload.hasOwnProperty('errors')) {
					error = createRequestError(request, '200', payload);
				}
				else if(!payload.hasOwnProperty('data')) {
					error = new Error(
						'Server response was missing for query ' +
						`\`${request.getDebugName()}\`.`
					);
				}

				if (payload.hasOwnProperty('data')) {
					request.resolve({response: payload.data});
				}
				else {
					request.reject(error);
				}
			}).catch(
				error => request.reject(error)
			)
		)));
	}

	/**
	 * Sends a POST request and retries if the request fails or times out.
	 */
	_sendQuery(request: RelayQueryRequest): Promise<any> {
		return fetchWithRetries(this._uri,
			Object.assign({}, this._init, {
				body: JSON.stringify({
					query: request.getQueryString(),
					variables: request.getVariables(),
				}),
				headers: Object.assign({
					'Accept': '*/*',
					'Content-Type': 'application/json',
				}, this._init.headers),
				method: 'POST'
			})
		);
	}
}
