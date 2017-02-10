
var findWithRegex = function findWithRegex(regex, index, contentBlock, callback) {
	// Get the text from the contentBlock
	var text = contentBlock.getText();
	var matchArr = 0;
	var start = 0;
	// Go through all matches in the text and return the indizes to the callback
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(
			start + (index > 0 ? matchArr.reduce((sum, m, i) => sum + (i != 0 && i < index ? m.length : 0), 0) : 0),
			start + (index > 0 ? matchArr.reduce((sum, m, i) => sum + (i != 0 && i <= index ? m.length : 0), 0) : matchArr[0].length)
		);
	}
};

export default findWithRegex;