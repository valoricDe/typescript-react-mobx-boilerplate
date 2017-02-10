declare namespace Types {
	type THandle = () => void;
}

declare namespace Components {
	import IRouterProps = Props.IRouterProps;
	import ComponentLifecycle = React.ComponentLifecycle;
	import * as ReactNode = React.ReactNode;
	import * as ReactInstance = React.ReactInstance;

	class IRouterComponent<P, S> implements ComponentLifecycle<P, S> {
		constructor(...args: any[]);
		constructor(props?: P, context?: any);

		setState(f: (prevState: S, props: P) => S, callback?: () => any): void;
		setState(state: S, callback?: () => any): void;

		forceUpdate(callBack?: () => any): void;

		render(): JSX.Element | null;

		// React.Props<T> is now deprecated, which means that the `children`
		// property is not available on `P` by default, even though you can
		// always pass children as variadic arguments to `createElement`.
		// In the future, if we can define its call signature conditionally
		// on the existence of `children` in `P`, then we should remove this.
		props: P & { children?: ReactNode };
		state: S;
		context: IRouterProps;
		refs: {
			[key: string]: ReactInstance
		};
	}
}