import { Modifier, EditorState, Entity } from 'draft-js';
import getTypeByTrigger from '../utils/getTypeByTrigger';
import findWithRegexAndSelection from "../utils/findWithRegexAndSelection";

const addMention = (editorState, mention, mentionPrefix, mentionTrigger, mentionTriggerRegExp, entityMutability) => {
  const entityKey = Entity.create(getTypeByTrigger(mentionTrigger), entityMutability, { mention });

  const currentSelectionState = editorState.getSelection();
  const { start, end } = findWithRegexAndSelection(editorState, currentSelectionState, mentionTriggerRegExp);

  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: start,
    focusOffset: end,
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `${mentionPrefix}${mention.get('name')}`,
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
