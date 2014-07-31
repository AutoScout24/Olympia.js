var Promise = require('bluebird');

var args = require('./args');

if (args.help) {
	console.log('Testing Framework for Tracking and SEO');
	console.log('Usage:');
	console.log('        -h        --help            Help');
	console.log('        -v        --verbose         Verbose output');
	console.log('        -t        --teamcity        Reporting for Teamcity');
	phantom.exit();
}


var Test = require('./test');

var queue = [];

function start() {
	Promise.resolve(queue).all().then(phantom.exit);
}

function TestCase(name, fn) {
	var promise = new Promise(function(resolve) {
		var test = new Test(name);
		fn(test, test.browser);
		test.next(resolve);
	}).catch(function(e) { console.log(e); });

	queue.push(promise);
}

module.exports = {
	TestCase: TestCase,
	start: start
};