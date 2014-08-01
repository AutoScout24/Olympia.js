var Promise = require('bluebird');
var Test = require('./test');

var args = require('./args');

var queue = [];

function start() {
	Promise
        .resolve(queue)
        .all()
        .then(phantom.exit);
}

function TestCase(name, fn) {
	var promise = new Promise(function(resolve) {
		var test = new Test(name);

        test.start();
        test.run(fn);
        test.end();

        test.next(resolve);
	}).catch(function(e) { console.log(e); });

	queue.push(promise);
}

module.exports = {
	TestCase: TestCase,
	start: start
};