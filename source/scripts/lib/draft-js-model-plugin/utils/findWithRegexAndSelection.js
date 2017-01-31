
export default (editorState, selection, regExp) => {
	const anchorKey = selection.getAnchorKey();
	const anchorOffset = selection.getAnchorOffset();
	const currentContent = editorState.getCurrentContent();
	const currentBlock = currentContent.getBlockForKey(anchorKey);

	// Get the text from the contentBlock
	var text = currentBlock.getText();
	var matchArr = 0;
	var start = 0;
	// Go through all matches in the text and return the indizes to the callback
	while ((matchArr = regExp.exec(text)) !== null) {
		start = matchArr.index;
		if(start <= anchorOffset && anchorOffset <= start + matchArr[0].length) {
			regExp.lastIndex = 0;
			return {
				match:  matchArr[1],
				start: start,
				end: start + matchArr[0].length,
			};
		}
	}

	regExp.lastIndex = 0;
	return {
		match: '',
		start: anchorOffset,
		end: anchorOffset,
	};
};
