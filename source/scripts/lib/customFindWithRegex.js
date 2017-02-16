import MultiRegExp2 from './draft-js-model-plugin/utils/MultiRegExp2'

export function getTextAndOffset(editorState, selection) {
	const anchorKey = selection.getAnchorKey();
	const anchorOffset = selection.getAnchorOffset();
	const currentContent = editorState.getCurrentContent();
	const contentBlock = currentContent.getBlockForKey(anchorKey);

	return [contentBlock.getText(), anchorOffset];
}

export function findWithRegex(text, callback, regex, groupForMatch = 0, groupForSelection) {
	if(!(regex instanceof MultiRegExp2)) {
		regex = new MultiRegExp2(regex);
	}

	let result;
	if(!groupForSelection) {
		let match;
		while ((match = regex.execForGroup(text, groupForMatch)) !== null) {
			result = callback(match.start, match.end, match);
			if(result) break;
		}
	}
	else {
		let matches;
		while ((matches = regex.execForAllGroups(text, true)) !== null) {
			result = callback(matches[groupForSelection].start, matches[groupForSelection].end, matches[groupForMatch], matches[groupForSelection]);
			if(result) break;
		}

	}

	regex.regexp.lastIndex = 0;
	return result;
}