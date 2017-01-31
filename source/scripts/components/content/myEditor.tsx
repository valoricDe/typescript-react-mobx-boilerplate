import React from 'react';
import {RichUtils, Modifier, EditorState, SelectionState} from 'draft-js';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
const Editor = require('draft-js-plugins-editor').default;
const createHashtagPlugin = require('draft-js-hashtag-plugin').default;
import 'draft-js-hashtag-plugin/lib/plugin.css';
const draftJsModelPlugin = require('../../lib/draft-js-model-plugin');
const createMentionPlugin = draftJsModelPlugin.default;
const defaultSuggestionsFilter = draftJsModelPlugin.defaultSuggestionsFilter;

import mentions from '../../lib/mention';

const mentionPlugin = createMentionPlugin({mentionTrigger: '[ ', mentionRegExp: '[\\s\\w\u4e00-\u9eff\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3\u3130-\u318F]*', mentionTriggerSuffix: ' ]'});
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export class MyEditor extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {editorState: props.editorState, suggestions: mentions};
	}

	onChange = (editorState) => this.setState({editorState});

	handleKeyCommand = (command) => {
		const {editorState} = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,'BOLD'))
	};

	onUnderlineClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,'UNDERLINE'))
	};

	onSearchChange = ({ value }) => {
		this.setState({
			suggestions: defaultSuggestionsFilter(value, mentions),
		});
	};

	onAddMention = () => {
		// get the mention object selected
	}

	render() {
		const {readOnly} = this.props;

		return (
			<div>
				<ButtonToolbar style={{paddingBottom: "2px"}}>
					<ButtonGroup>
						<Button onClick={this.onBoldClick}>Bold</Button>
						<Button onClick={this.onUnderlineClick}>Underline</Button>
					</ButtonGroup>
				</ButtonToolbar>
				<div className="form-control" style={{height: 'auto'}}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						plugins={plugins}
						handleKeyCommand={this.handleKeyCommand}
						spellCheck={true}
						readOnly={readOnly}
						handleBeforeInput={(chars: String) => {
							if (chars === '[') {
								const { editorState } = this.state;
								const content = editorState.getCurrentContent();
								const selection = editorState.getSelection();

								let textFunction = Modifier.insertText;
								let editorChangeType = 'insert-text';

								if(selection.getAnchorOffset() != selection.getFocusOffset() ) {
									textFunction = Modifier.replaceText;
									editorChangeType = 'replace-text';
								}

								const contentReplaced = textFunction(
										content,
										selection,
										"[  ]"
									);

								const selectionAfter = contentReplaced.getSelectionAfter();
								const contentReplaced2 = contentReplaced.set('selectionAfter', selectionAfter.merge({
											anchorOffset: selectionAfter.getAnchorOffset()-2,
											focusOffset: selectionAfter.getFocusOffset()-2
										}));
								const editorStateModified = EditorState.push(
										editorState,
										contentReplaced2,
										editorChangeType
									);

								this.setState({editorState:editorStateModified});
								return 'handled';
							}
							return 'not-handled';
						}}
						handleDrop={
							(selection, dataTransfer, isInternal) =>
							{ console.log(selection, dataTransfer, isInternal); return 'not-handled' }
						}
					/>
				</div>

				<MentionSuggestions
					onSearchChange={this.onSearchChange}
					suggestions={this.state.suggestions}
					onAddMention={this.onAddMention}
				/>
			</div>
		);
	}
}