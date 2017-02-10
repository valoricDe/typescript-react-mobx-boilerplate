import {Modifier, EditorState, Entity} from 'draft-js';
import getTypeByTrigger from '../utils/getTypeByTrigger';
import findWithRegexesAndSelectionAndState from "../utils/findWithRegexesAndSelectionAndState";

const addMention = (editorState, mention, editorRepresentation, mentionTrigger, mentionTriggerRegExp, entityMutability, isEntry) => {
	mention = mention.merge({isShallow: isEntry});
	const entityKey = Entity.create( getTypeByTrigger(mentionTrigger) + (isEntry ? '-used' : ''), entityMutability, {mention});

	const currentSelectionState = editorState.getSelection();
	const {start, end} = findWithRegexesAndSelectionAndState(
		editorState, currentSelectionState, isEntry ? [mentionTriggerRegExp, /[\w_\d\.,]+/g] : [mentionTriggerRegExp] , isEntry ? [2, 0] : [2]
	);

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
