/**
 * Created by velten on 27.10.16.
 */
const path = require('path');

// Interface Utils
const interfaceUtils = require('gql2ts/util/interface');

// Module Utils
const moduleUtils = require('gql2ts/util/namespace');

const settings = require('../settings');
const schema = require(settings.graphql.schemaLocation.json);

let options = {};
options['outputFile'] = path.join(settings.paths.scripts.path, path.join('types', 'schema.d.ts'));
options['moduleName'] = 'GQL';
options['ignoredTypes'] = [];

let interfaces = interfaceUtils.schemaToInterfaces(schema, options);
let transformed = moduleUtils.generateNamespace(options.moduleName, interfaces);
moduleUtils.writeNamespaceToFile(options.outputFile, transformed);
