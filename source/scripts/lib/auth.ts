import Relay from 'react-relay';

import RelayNetworkLayer from "./RelayNetworkLayer";
const graphql = require('../../../misc/settings').graphql;
//const graphql = {host: 'localhost', port: 3000};

class Auth {
	environment;
	afterLogin;
	afterLogout;
	onTokenError;
	currentUser = null;


	constructor() {
		this.environment = new Relay.Environment();
		// Inject a new network layer into Relay with NO token
		this.environment.injectNetworkLayer(this._buildNetworkLayer());
	}

	getToken() {
		return localStorage.accessToken;
	}

	login(token) {
		// persist token in localStorage
		localStorage.accessToken = token;
		// "Renew" this.environment each login
		this.environment = new Relay.Environment();
		this.environment.injectNetworkLayer(this._buildNetworkLayer());
		if (this.afterLogin) this.afterLogin();
	}

	logout(callback) {
		// delete token from localStorage
		delete localStorage.accessToken;
		// Renew this.environment each logout to override
		this.environment = new Relay.Environment();
		this.environment.injectNetworkLayer(this._buildNetworkLayer());
		if (callback) callback();
		if (this.afterLogout) this.afterLogout();
	}

	loggedIn() {
		return !!localStorage.accessToken;
	}

	getEnvironment(){
		return this.environment;
	}

	setCurrentUser(user) {
		this.currentUser = user;
	}

	getCurrentUser() {
		return this.currentUser;
	}

	_buildNetworkLayer(){
		let loggedIn = this.loggedIn();
		let props = {
			headers: (loggedIn ? {
				Authorization: 'Bearer ' + this.getToken()
			} : {}),
			onError: (error, init) => {
				console.log('_buildNetworkLayer', error);
				if((error.status == 400 || error.status == 500) && loggedIn) {
					delete localStorage.accessToken;
					delete init['Authorization'];
					if(this.onTokenError) this.onTokenError();
					else return true;
					return false;
				}
				return false;
			}
		};
		return new RelayNetworkLayer('http://'+graphql.host+':'+graphql.port+'/graphql', props);
	}
}

// Export singleton
module.exports = new Auth();
