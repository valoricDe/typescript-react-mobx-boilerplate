import {Modifier, EditorState, Entity} from 'draft-js';
import getTypeByTrigger from '../utils/getTypeByTrigger';
import {getTextAndOffset, findWithRegex} from "../../customFindWithRegex";

const addMention = (editorState, mention, editorRepresentation, mentionTrigger, mentionTriggerRegExp, entityMutability, isEntry) => {
	const entityKey = Entity.create( getTypeByTrigger(mentionTrigger) + (isEntry ? '-usage' : ''), entityMutability, {mention});

	const currentSelectionState = editorState.getSelection();
	let [text, offset] = getTextAndOffset(editorState, currentSelectionState);
	let start = offset;
	let end = offset;

	let match;
	if(isEntry) {
		match = findWithRegex(text, (start, end, match) => (start <= offset && offset <= end) ? match : null, mentionTriggerRegExp, 2);
	}
	else {
		match = findWithRegex(text, (start, end, groupMatch, selectionMatch) =>
			(start <= offset && offset <= end) ? {match: groupMatch.match, start: selectionMatch.start, end: selectionMatch.end} : null, mentionTriggerRegExp, 2, 1);
	}

	if(match) {
		({start, end} = match);

		if(isEntry) {
			offset -= start;
			const wordMatch = findWithRegex(match.match, (start, end, match) =>
				(start <= offset && offset <= end) ? match : null, /[\w_\d\.,]+/g);
			if(wordMatch) {
				start = match.start + wordMatch.start;
				end = match.start + wordMatch.end;
			}
		}
	}

	// get selection of the @mention search text
	const mentionTextSelection = currentSelectionState.merge({
		anchorOffset: start,
		focusOffset: end,
	});

	let mentionReplacedContent = Modifier.replaceText(
		editorState.getCurrentContent(),
		mentionTextSelection,
		editorRepresentation(mention, isEntry),
		null, // no inline style needed
		entityKey
	);

	// If the mention is inserted at the end, a space is appended right after for
	// a smooth writing experience.
	const blockKey = mentionTextSelection.getAnchorKey();
	const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
	if (blockSize === end) {
		mentionReplacedContent = Modifier.insertText(
			mentionReplacedContent,
			mentionReplacedContent.getSelectionAfter(),
			' ',
		);
	}

	const newEditorState = EditorState.push(
		editorState,
		mentionReplacedContent,
		'insert-mention',
	);
	return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
};

export default addMention;
