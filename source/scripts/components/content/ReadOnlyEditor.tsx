import * as React from 'react';
import {RichUtils, Modifier, EditorState, SelectionState, convertToRaw, Entity, convertFromRaw, ContentState, convertFromHTML} from 'draft-js';
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

var currencyMapper = {
	'EUR': ['euro', '€'],
	'USD': ['dollar', '$'],
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

// TODO put it into database
if(math.type.Unit.UNITS.EUR === undefined) {
	const exchangeRates = require('../../lib/exchangeRates.json');
	math.createUnit(exchangeRates.base, {aliases: currencyMapper[exchangeRates.base]});
	Object.entries(exchangeRates.rates).forEach(([currency, rate]) => {
		console.log('EUR = '+rate+' '+currency);
		math.createUnit(currency, {definition: (1/rate)+' EUR', aliases: currencyMapper[currency]});
	});
}

function mathFormatCallback(value) {
	if(value > 1e12 || value < 1e-6)
		return math.format(value, 5);
	else {
		return Number(value).toLocaleString();
	}
}

function mathNodeToFormattedString(node) {
	if(typeof node === 'number') {
		return mathFormatCallback(node);
	}
	if (node.isConstantNode) {
		if (node.valueType === 'string') {
			return '"' + node.value + '"';
		}
		else {
			return mathFormatCallback(node.value);
		}
	}
	else {
		return undefined;
	}
}

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
export class ReadOnlyEditor extends React.Component<any, any> {
	@observable readOnly = false;
	scope = {};
	calculations = false;

	constructor(props) {
		super(props);

		let contentState;
		try {
			const contentStateJSON = JSON.parse(props.children);
			contentState = convertFromRaw(contentStateJSON);
			contentState = new ContentState(contentState);
			this.calculations = true;
		}
		catch(e) {
			console.log('ReadOnly constructor', e);
			const blocksFromHTML = convertFromHTML(props.children);
			contentState = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
		}
		this.state = {editorState: EditorState.createWithContent(contentState), suggestions: List(), models: Map(), calculationComponents: Map()};

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
					store={this.state}
					container={this}
					updateComponents={this.updateCalculationComponents.bind(this)}
					updateModels={this.updateModels.bind(this)}
					setReadOnly={this.setReadOnly.bind(this)}
					updateValue={this.updateNodeWithValue.bind(this)}
					initializeMention={this.onAddMention.bind(this)}
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

	updateModels(entityKey, model) {
		//scope = models.map(model => [model.get('name'), model.get('value')]).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
		this.setState((state) => ({models: model === undefined ? state.models.delete(entityKey) : state.models.set(entityKey, model)}));
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

	updateCalculationComponents = (entityKey, calculationComponent) => {
		this.setState((state) => ({calculationComponents: state.calculationComponents.set(entityKey, calculationComponent)}));
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
		value = String(typeof value === 'object' ? value.toNumber() : value);

		let baseNode:MathNode = mention.get('node');
		let node = baseNode;
		if(node.isConstantNode) {
			node.value = value;
		}
		else if(node.value && node.value.isConstantNode) {
			node.value.value = value;
		}
		else if(node.isOperatorNode && node.args[0].isConstantNode && node.args[1].isSymbolNode) {
			node.args[0].value = value;
		}
		else if(node.isAssignmentNode && node.value) {
			let node = baseNode.value;
			if(node.isConstantNode) {
				node.value = value;
			}
			else if(node.value && node.value.isConstantNode) {
				node.value.value = value;
			}
			else if(node.isOperatorNode && node.args[0].isConstantNode && node.args[1].isSymbolNode) {
				node.args[0].value = value;
			}
		}
		baseNode.compile().eval(this.scope);
		this.state.calculationComponents.forEach(component => { component.forceUpdate() });
		this.setState(state => ({models: state.models.set(entityKey, mention.set('node', node))}));
		//this.recalculateModelValues();
	}

	recalculateModelValues() {
		this.setState({models: this.state.models.map(mention => mention.set('value', mention.get('node').compile().eval(this.scope)))});
	}

	nodeIsEditable(node: MathNode) {
		// direct editable nodes
		let direct = node.isConstantNode ||
			(node.value && node.value.isConstantNode) ||
			(node.isOperatorNode && node.args[0].isConstantNode && node.args[1].isSymbolNode);
		// assigned editable nodes
		let assigned = node.isAssignmentNode && node.value && (
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
			const value = node.compile().eval(this.scope);
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

			return Map({raw: mention, name, value, node, source: "http://example.org", editable});
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

		console.log("does rerender", this.scope, this.state.models.map((v) => math.format(v.get('node'), 5)).toArray());

		const editorContainerStyle = {width: this.state.models.length ? '70%': '70%'};
		const modelsContainerStyle = {maxWidth: '400px', overflow: 'auto', display: this.state.models.length ? 'block' : 'block', paddingLeft: '6px', borderLeft: '1px solid #ccc'};
		const modelsContainerHeadlineStyle = {margin: '0'};

		return (
			<div>
				<div className={"editorPanels"+(this.readOnly ? ' noselect': '')} style={{height: 'auto'}}>
					<div style={editorContainerStyle}>
						<Editor
							editorState={this.state.editorState}
							onChange={this.onChange}
							plugins={this.plugins}
							handleKeyCommand={this.handleKeyCommand}
							spellCheck={true}
							readOnly={true}
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
					{this.calculations && this.state.models.size ?
						<div style={modelsContainerStyle}>
							<p className="calculation-headline" style={modelsContainerHeadlineStyle}>Calculations:</p>
							<ul style={{listStyleType: "none", padding: "0"}}>
								{Array.from(this.state.models.values()).map((v, i) => {
									const node = v.get('node');
									const formatted = node.toString({ handler: mathNodeToFormattedString });
									return <li key={i}>{formatted} {!this.nodeIsEditable(node) ? ': '+math.format(node.compile().eval(this.scope), mathNodeToFormattedString) : '' }</li>;
								})}
							</ul>
						</div> :
						null
					}

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