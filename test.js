const math = require('mathjs');

/**
 * Helper function to output a value in the console. Value will be formatted.
 * @param {*} value
 */
function print (value) {
	var precision = 14;
	console.log(math.format(value, precision));
}

// provide a scope (just a regular JavaScript Object)
console.log('\nevaluate expressions providing a scope with variables and functions');
var scope = {
	a: 3,
	b: 4
};

// variables can be read from the scope
print(math.eval('a * b', scope));           // 12

// variable assignments are written to the scope
print(math.eval('c = 2.3 + 4.5', scope));   // 6.8
print(scope.c);                             // 6.8

let text = "d = 20";
let node = math.parse(text);
print(node.compile().eval(scope));
print(scope.d);
console.log(scope);
