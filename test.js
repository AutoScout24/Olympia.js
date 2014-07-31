var fs = require('fs');

var Browser = require('./browser');
var Promise = require('bluebird');

var TestLogger = function(testSuiteName) {
	Object.defineProperties(this, {
		logs: { value: [], writable: false }
	});
};

TestLogger.prototype.log = function() {
	this.logs.push(Array.prototype.slice.call(arguments));
};

function bind(fn, obj) {
	return function() {
		fn.apply(obj, arguments);
	}
}

var Test = function(name) {
	var self = this;
	var browser = new Browser();
	var promise = Promise.resolve();

	Object.defineProperties(this, {
		browser: {
			value: browser,
			writable: false
		},
		
		name: {
			value: name,
			writable: false
		},

		logger: {
			value: new TestLogger(name),
			writable: false
		}
	});

	this.next = function(fn) {
		if (typeof fn === 'function') {
			promise = promise.then(bind(fn, self));
		} else if (fn instanceof Promise) {
			promise = promise.then(function() { return bind(fn, self); });
		}
	};
};

Test.prototype.step = Test.prototype.check = function(fn) {
	this.next(fn);
};

/*
Test.prototype.open = function(url) {
	this.next(this.browser.open(url));
	return this;
};

Test.prototype.waitUntilPageLoaded = function() {
	var self = this;
	this.next(function() { return self.browser.waitUntilPageLoaded(); });
	return this;
};

Test.prototype.action = function(fn) {
	var self = this;
	this.next(function() { self.browser.action(fn); });
	return this;
};
*/

Test.prototype.log = function(x) {
	var self = this;
	this.next(function() {
		self.logger.log(x);
	});
	return this;
};

module.exports = Test;