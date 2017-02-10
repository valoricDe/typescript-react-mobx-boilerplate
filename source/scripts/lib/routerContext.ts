import * as ReactRouter from 'react-router/lib/Router';
import * as React from 'react';

export function Router(target: any) {
	target.contextTypes = target.contextTypes || {};
	target.contextTypes.router = React.PropTypes.func.isRequired;
}

export interface IRouterContext {
	router: ReactRouter;
}