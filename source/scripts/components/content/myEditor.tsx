import * as React from 'react';
import {RichUtils, Modifier, EditorState, SelectionState, convertToRaw, Entity} from 'draft-js';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
const Editor = require('draft-js-plugins-editor').default;
const createHashtagPlugin = require('draft-js-hashtag-plugin').default;
import 'draft-js-hashtag-plugin/lib/plugin.css';
const draftJsModelPlugin = require('../../lib/draft-js-model-plugin');
const createMentionPlugin = draftJsModelPlugin.default;
import {Map, List} from 'immutable';
import {observable} from "mobx";
import {observer} from "mobx-react";
import Calculation from "./calculation";
import decorateWithProps from 'decorate-component-with-props';
import math from 'mathjs';
import yaml from 'js-yaml';
import MathNode = mathjs.MathNode;
import 'core-js/fn/object/entries';

//math.config({
// precision: 2
// });


var scope = {};
var currencyMapper = {
	'EUR': ['euro', '€'],
	'USD': ['dollar'],
};

/*fetch("http://api.fixer.io/latest")
	.then(response => response.json())
	.then(json => {
		math.createUnit(json.base, {aliases: currencyMapper[json.base]});
		Object.entries(json.rates).forEach(([currency, rate]) => {
			console.log('EUR = '+rate+' '+currency);
			math.createUnit(currency, {definition: (1/rate)+' EUR', aliases: currencyMapper[currency]});
		});
	})
	.catch(console.error);*/

const Entry = (props) => {
	const {
		mention,
		theme,
		searchValue, // eslint-disable-line no-unused-vars
		...parentProps
	} = props;

	return (
		<div {...parentProps}>
			<div className={theme.mentionSuggestionsEntryContainer}>
				<div className={theme.mentionSuggestionsEntryContainerLeft}>
					<div className={theme.mentionSuggestionsEntryText}>
						{mention.get('name')}
					</div>
				</div>

				<div className={theme.mentionSuggestionsEntryContainerRight}>
					<div className={theme.mentionSuggestionsEntryText}>
						{math.format(mention.get('value'))}
					</div>
				</div>
			</div>
			<div className={theme.mentionSuggestionsEntryTitle}>
				{mention.get('source')}
			</div>
		</div>
	);
};

@observer
export class MyEditor extends React.Component<any, any> {
	@observable readOnly = false;

	constructor(props) {
		super(props);

		this.state = {editorState: props.editorState, suggestions: List(), models: Map()};

		const mentionPlugin = createMentionPlugin({
			mentionTrigger: '[ ',
			mentionRegExp: '[^\\]]*',
			mentionTriggerSuffix: ' ]',
			entityMutability: 'IMMUTABLE',
			/*positionSuggestions: ({ state, props }) => {
			 return {
			 transform: 'scaleY(1)',
			 transition: 'all 0.25s cubic-bezier(.3,1.2,.2,1)',
			 };
			 },*/
			//theme: {mentionSuggestions: 'mentionSuggestion mentionSuggestionPortal'}
			mentionComponent: ({children, ...props}) =>
				<Calculation
					models={this.state.models}
					updateModels={this.updateModels.bind(this)}
					setReadOnly={this.setReadOnly.bind(this)}
					updateValue={this.updateNodeWithValue.bind(this)}
					{...props}
				>

					{children}
				</Calculation>,
			editorRepresentation: (mention, isEntry) => {
				return isEntry ? mention.get('name') + ' ' : '###[' + JSON.stringify(mention.toJSON()) + ']###';
			},
		});
		this.MentionSuggestions = mentionPlugin.MentionSuggestions;

		this.plugins = [
			mentionPlugin,
		];
	}

	updateModels(models) {
		//scope = models.map(model => [model.get('name'), model.get('value')]).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
		this.setState({models});
	}

	setReadOnly(readonly) {
		this.readOnly = readonly;
	}

	onChange = (editorState) => {
		// TODO directly access entity map directy
		//const contentState = convertToRaw(this.state.editorState.getCurrentContent());
		//const models = Map(contentState.entityMap).toList().filter(v => v.type === entityType).map(v => v.data.mention);

		this.setState({editorState});
		this.props.onChange(editorState);
	}

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
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
	};

	onUnderlineClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
	};

	defaultSuggestionsFilter(searchValue, suggestions) {
		const value = searchValue.toLowerCase();
		const filteredSuggestions = suggestions.filter((suggestion) => (
			!value || suggestion.get('name').toLowerCase().indexOf(value) > -1 || suggestion.get('value').toString().startsWith(value)
		));
		const size = Math.min(filteredSuggestions.size, 5);
		return filteredSuggestions.setSize(size);
	}

	onSearchChange = ({fullMatch, wordMatch}) => {
		this.setState({
			suggestions: this.defaultSuggestionsFilter(wordMatch, this.state.models.toList()),
		});
	};

	getNodeFromText(text) {
		try {
			return math.parse(text);
		}
		catch (error) {
			// try swapping assignement
			if (error.message.startsWith('Invalid left hand side of assignment operator')) {
				const expressions = text.split('=');
				try {
					return math.parse(expressions[1]+' = '+expressions[0]);
				}
				catch (error) {
					console.log('getNodeFromText', error);
					return null;
				}
			}
		}
	}

	updateNodeWithValue = (entityKey, mention, value) => {
		let node:MathNode = mention.get('node');

		this.recalculateModelValues(this.state.models.set(entityKey, mention.set('node', node)));
	}

	recalculateModelValues(models) {
		this.setState({models: models.map(mention => mention.set('value', mention.get('node').compile().eval(scope)))});
	}

	nodeIsEditable(node: MathNode) {
		// direct editable nodes
		let direct = node.isConstantNode ||
			(node.value && node.value.isConstantNode) ||
			(node.isOperatorNode && node.args[0].isConstantNode && node.args[1].isSymbolNode);
		// assigned editable nodes
		let assigned = node.isAssignementNode && node.value && (
				node.value.isConstantNode ||
				(node.value.value && node.value.value.isConstantNode) ||
				(node.value.isOperatorNode && node.value.args[0].isConstantNode && node.value.args[1].isSymbolNode)
			);
		return direct || assigned;
	}

	onAddMention = ({mention, isEntry}) => {
		if (isEntry) {
			return mention;
		}

		let node = this.getNodeFromText(mention);
		if(!node) return;

		console.log('onAddMention', node);
		try {
			const value = node.compile().eval(scope);
			let name = node.name;
			let editable = this.nodeIsEditable(node);
			const modelNames = this.state.models.map(model => model.get('name'));
			if(node.isAssignmentNode || node.isFunctionAssignmentNode) {
				if(modelNames.includes(name)) {
					return; // identifier already exists
				}
			}
			else {
				if(!name) {
					let i = 0;
					while(modelNames.includes('x' + i)) {
						i++;
					}
					name = 'x' + i;
				}
				node = this.getNodeFromText(name + ' = ' + mention);
				if(!node) return;
			}


			console.log('onAddMention', value);

			return Map({name, value, node, source: "http://example.org", editable});
		}
		catch (error) {
			console.log('onAddMention', error);
			return;
		}

		//console.log(node, parser.eval(mention.get('value')));
		//return mention.set('node', node);
		//this.setState({models: this.state.models.set(this.state.models.size, mention)});
	}

	render() {
		const {MentionSuggestions} = this;

		console.log("does rerender", scope);

		const editorContainerStyle = {width: this.state.models.length ? '70%': '70%'};
		const modelsContainerStyle = {display: this.state.models.length ? 'block' : 'block', paddingLeft: '6px', borderLeft: '1px solid #ccc'};
		const modelsContainerHeadlineStyle = {margin: '0'};

		return (
			<div>
				<ButtonToolbar style={{paddingBottom: "2px"}}>
					<ButtonGroup>
						<Button onClick={this.onBoldClick}>Bold</Button>
						<Button onClick={this.onUnderlineClick}>Underline</Button>
					</ButtonGroup>
				</ButtonToolbar>
				<div className={"form-control editorPanels"+(this.readOnly ? ' noselect': '')} style={{height: 'auto'}}>
					<div style={editorContainerStyle}>
						<Editor
							editorState={this.state.editorState}
							onChange={this.onChange}
							plugins={this.plugins}
							handleKeyCommand={this.handleKeyCommand}
							spellCheck={true}
							readOnly={this.readOnly}
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
								{ console.log('handleDrop', selection, dataTransfer, isInternal); return 'not-handled' }
							}
						/>
					</div>
					<div style={modelsContainerStyle}>
						<p className="calculation-headline" style={modelsContainerHeadlineStyle}>Calculations (started by typing "["):</p>
						<ul style={{listStyleType: "none", padding: "0"}}>
							{this.state.models.map((v, i) => <li key={i}>{math.format(v.get('node'), 5)}</li>).toArray()}
						</ul>
					</div>
				</div>

				<MentionSuggestions
					onSearchChange={this.onSearchChange}
					suggestions={this.state.suggestions}
					onAddMention={this.onAddMention}
					entryComponent={Entry}
				/>
			</div>
		);
	}
}