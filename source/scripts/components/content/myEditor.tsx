import React from 'react';
import {Editor, RichUtils, Modifier, EditorState, SelectionState, DraftHandleValue} from 'draft-js';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import DraftDragType = Draft.Model.Constants.DraftDragType;
import {Input} from "formsy-react-components";

export class MyEditor extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {editorState: props.editorState};
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
											anchorOffset: selectionAfter.getAnchorOffset(),
											focusOffset: selectionAfter.getFocusOffset()
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
			</div>
		);
	}
}