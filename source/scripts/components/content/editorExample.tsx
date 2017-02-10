import * as React from 'react';
import {CompositeDecorator, Editor, EditorState, Modifier, SelectionState} from 'draft-js';
import { Map } from 'immutable';

const Div = (props) => {
	var drop = (x)=>{
	}
	var start = (e)=>{
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData("text", props.block.key);
	}
	return (
		<div contentEditable={false} onDragStart={start} draggable={true} {...props} style={{backgroundColor: 'rgba(98, 177, 254, 1.0)',width:'40px',height:'40px'}} onDrop={drop} onDragEnd={drop}></div>
	)
};

export default class editorExample extends React.Component<any, any> {
	focus = () => this.editor.focus();
	onChange = (editorState) => {
		this.setState({editorState});
	}
	logState = () => console.log(this.state.editorState.toJS());

	constructor() {
		super();
		const compositeDecorator = new CompositeDecorator([]);

		this.state = {
			editorState: EditorState.createEmpty(compositeDecorator),
		};
	}

	static myBlockRenderer(contentBlock) {
		const type = contentBlock.getType();
		console.log(type);
		if (type === 'div') {
			return {
				component: Div,
				editable: false,
				props: {

				}
			};
		}
	}

	addBlock = () => {
		var editorState = this.state.editorState;
		var contentState = editorState.getCurrentContent();
		var selectionState = editorState.getSelection();

		var afterRemoval = Modifier.removeRange(
			contentState,
			selectionState,
			'backward'
		);
		var targetSelection = afterRemoval.getSelectionAfter();
		console.log('t');
		var afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
		console.log('t');
		var insertionTarget = afterSplit.getSelectionAfter();
		console.log('t');

		var asMedia = Modifier.setBlockType(afterSplit, insertionTarget, 'div');
		console.log('t');
		this.setState({editorState: EditorState.push(editorState, asMedia)})
		console.log('t');
	}

	render() {
		var drop = (e)=>{
			var blockKey = e.dataTransfer.getData("text");
			// Set timeout to allow cursor/selection to move to drop location
			setTimeout(()=>{
				// Get content, selection, block
				var content = this.state.editorState.getCurrentContent();
				var selection = this.state.editorState.getSelection();
				var block = content.getBlockForKey(blockKey);

				// Split on drop location and set block type
				var afterSplit = Modifier.splitBlock(content, selection);
				var insertionTarget = afterSplit.getSelectionAfter();
				var afterInsert = Modifier.setBlockType(afterSplit, insertionTarget, block.type);

				// Get block range and remove dragged block
				var targetRange = new SelectionState({
					anchorKey: blockKey,
					anchorOffset: 0,
					focusKey: blockKey,
					focusOffset: block.getLength(),
				});
				var afterRemoval = Modifier.removeRange(afterInsert, targetRange, 'backward');
				var resetBlock = Modifier.setBlockType(
					afterRemoval,
					afterRemoval.getSelectionAfter(),
					'unstyled'
				);
				var newState = EditorState.push(this.state.editorState, resetBlock, 'remove-range');
				this.setState({ editorState: EditorState.forceSelection(newState, resetBlock.getSelectionAfter()) });
			}, 1);
		}

		return (
			<div style={styles.root}>
				<div style={styles.editor} onClick={this.focus} onDrop={drop}>
					<Editor
						blockRenderMap={Map({
						'header-two': {
						element: 'h2'
  },
  'unstyled': {
						element: 'h2'
  },
  'div': {
  	element: 'div'
  }
})}
						blockRendererFn={editorExample.myBlockRenderer}
						editorState={this.state.editorState}
						onChange={this.onChange}
						placeholder="Write a tweet..."
						ref={el => {this.editor = el;}}
						spellCheck={true}
					/>
				</div>
				<input
					onClick={this.logState}
					style={styles.button}
					type="button"
					value="Log State"
				/>
				<input
					onClick={this.addBlock}
					style={styles.button}
					type="button"
					value="Add block"
				/>
			</div>
		);
	}
}

const styles = {
	root: {
		fontFamily: '\'Helvetica\', sans-serif',
		padding: 20,
		width: 600,
	},
	editor: {
		border: '1px solid #ddd',
		cursor: 'text',
		fontSize: 16,
		minHeight: 40,
		padding: 10,
	},
	button: {
		marginTop: 10,
		textAlign: 'center',
	}
};