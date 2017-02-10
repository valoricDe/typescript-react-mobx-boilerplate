
export function findByTextOffsetAndRegexes(text, offset, regexes, groups = Array(regexes.length).fill(0), lengthGroups) {
	const regex = regexes.shift();
	const index = groups.shift();

	var matchArr = 0;
	var firstIndex = 0;
	while ((matchArr = regex.exec(text)) !== null) {
		// Go through all matches in the text and return the indizes to the callback
		firstIndex = matchArr.index;
		let r;
		if(lengthGroups) {
			r = {
				match:  matchArr[index],
				start:  firstIndex + lengthGroups.reduce((sum, i) => sum + matchArr[i].length, 0),
			};
		}
		else {
			r = {
				match:  matchArr[index],
				start:  firstIndex + (index > 0 ? matchArr.reduce((sum, m, i) => sum + (i != 0 && i < index ? m.length : 0), 0) : 0),
			};
		}
		r.end = r.start + matchArr[index].length;

		if (r.start <= offset && offset <= r.end) {
			regex.lastIndex = 0;

			if(regexes.length) {
				const {match, start, end} = findByTextOffsetAndRegexes(matchArr[index], offset - r.start, regexes, groups);
				return {
					match:  match,
					start:  r.start + start,
					end:    r.start + end,
				};
			}
			return r;
		}
	}

	regex.lastIndex = 0;
	return {
		match: '',
		start: offset,
		end: offset,
	};
}

export function findWithRegexAndSelectionAndContentBlock(regexes, groups = Array(regexes.length).fill(0), selection, contentBlock, callback) {
	const {start, end} = findByTextOffsetAndRegexes(contentBlock.getText(), selection.getAnchorOffset(), regexes, groups);
	callback(start, end);
}

export default function findWithRegexesAndSelectionAndState(editorState, selection, regexes, groups = Array(regexes.length).fill(0), lengthGroups = null) {
	const anchorKey = selection.getAnchorKey();
	const anchorOffset = selection.getAnchorOffset();
	const currentContent = editorState.getCurrentContent();
	const contentBlock = currentContent.getBlockForKey(anchorKey);

	return findByTextOffsetAndRegexes(contentBlock.getText(), anchorOffset, regexes, groups, lengthGroups);
};
