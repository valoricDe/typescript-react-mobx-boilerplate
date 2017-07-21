/**
 * Created by velten on 30.04.17.
 */
function isLeftClickEvent(event) {
	return event.button === 0;
}

function isModifiedEvent(event) {
	return (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function resolveToLocation(to, router) {
	return typeof to === 'function' ? to(router.location) : to;
}


export function routedOnClick(location, target, router) {
	return (event) => {
		if (event.defaultPrevented) return;

		if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

		// If target prop is set (e.g. to "_blank"), let browser handle link.
		/* istanbul ignore if: untestable with Karma */
		if (target) return;

		event.preventDefault();

		router.push(location);
	}
}

export function routerClickHelper(to, target, router, ) {
	const location = resolveToLocation(to, router);

	return {
		onClick: routedOnClick(location, target, router),
		href: location,
		key: location
	};
}