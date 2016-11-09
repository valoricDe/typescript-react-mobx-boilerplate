declare module "formsy-react" {
	const Formsy:any;
	export = Formsy;
}

declare module "formsy-react-components" {
	import * as React from "react";

	export class Checkbox extends React.Component<any, any> {}
	export class CheckboxGroup extends React.Component<any, any> {}
	export class Input extends React.Component<any, any> {}
	export class RadioGroup extends React.Component<any, any> {}
	export class Select extends React.Component<any, any> {}
	export class Textarea extends React.Component<any, any> {}
	export class Row extends React.Component<any, any> {}
	export class File extends React.Component<any, any> {}
}

declare module "react-router-relay" {
	import {Middleware} from "react-router/lib/applyRouterMiddleware";
	import Router from "react-router/lib/Router";
	import self from "react-router/lib/Route";

	const RelayMiddleware:Middleware;
	export default RelayMiddleware;

	export interface RelayRouter extends React.ComponentClass<RelayRouterProps> { }

	interface RelayRouterProps extends Router.RouterProps {
		render?(...middlewares: any[]): any
		environment?: any
	}

	namespace Route {
		import RouteProps = self.RouteProps;
		export interface RelayRouterProps extends RouteProps {
			name?: string;
			queries?: any;
			render(props: any): React.Component<any, any>
		}
	}
}

declare module "react-relay/lib/RelayRootContainer" {
	import Relay from "react-relay";
	export = Relay.RootContainer;
}

declare module "react-bootstrap/lib/Navbar" {
	import {Navbar} from "react-bootstrap";
	export = Navbar;
}

declare module "react-bootstrap/lib/Nav" {
	import {Nav} from "react-bootstrap";
	export = Nav;
}

declare module "react-bootstrap/lib/NavItem" {
	import {NavItem} from "react-bootstrap";
	export = NavItem;
}

declare module "react-bootstrap/lib/Panel" {
	import {Panel} from "react-bootstrap";
	export = Panel;
}

declare module "react-bootstrap/lib/ButtonGroup" {
	import {ButtonGroup} from "react-bootstrap";
	export = ButtonGroup;
}