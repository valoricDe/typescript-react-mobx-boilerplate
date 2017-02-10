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
	import * as Relay from "react-relay";
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

declare module "react-bootstrap/lib/Button" {
	import {Button} from "react-bootstrap";
	export = Button;
}

declare module "react-bootstrap/lib/ButtonGroup" {
	import {ButtonGroup} from "react-bootstrap";
	export = ButtonGroup;
}

declare module "react-bootstrap/lib/ButtonToolbar" {
	import {ButtonToolbar} from "react-bootstrap";
	export = ButtonToolbar;
}

declare module "react-bootstrap/lib/NavDropdown" {
	import {NavDropdown} from "react-bootstrap";
	export = NavDropdown;
}

declare module "react-bootstrap/lib/MenuItem" {
	import {MenuItem} from "react-bootstrap";
	export = MenuItem;
}

declare module "react-bootstrap/lib/Clearfix" {
	import {Clearfix} from "react-bootstrap";
	export = Clearfix;
}

declare module "react-bootstrap/lib/Glyphicon" {
	import {Glyphicon} from "react-bootstrap";
	export = Glyphicon;
}


declare module 'react-bootstrap-typeahead' {
	import * as React = require('react')
	interface TypeaheadProps extends React.HTMLProps<Typeahead> {
		align?: string;
		allowNew?: boolean;
		defaultSelected?: any[];
		disabled?: boolean;
		emptyLabel?: string;
		labelKey?: string;
		maxHeight?: number;
		minLength?: number;
		multiple?: boolean;
		name?: string;
		newSelectionPrefix?: string;
		onBlur?(event: React.FocusEvent<Typeahead>): void;
		onChange?(event: React.FormEvent<Typeahead>): void;
		onInputChange?(event: React.KeyboardEvent<Typeahead>): void;
		options: any[];
		paginateResults?: number;
		paginationText?: string;
		placeholder?: string;
		renderMenuItemChildren?(): any;
	}
	export class Typeahead extends React.Component<TypeaheadProps, any> {
	}
}

declare module 'draft-js-export-html' {
	export function stateToHTML(state: any): any
}

declare module 'react-touch' {
	export class Draggable extends React.Component<any, any> {}
}