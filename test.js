var fs = require('fs');
var args = require('./args');
var expect = require('chai').expect;

var Browser = require('./browser');
var Promise = require('bluebird');
var logger = 'simple'
if(args.teamcity) {
	logger = 'teamcity';
}

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
        var args = Array.prototype.slice.call(arguments);
		return fn.apply(obj, args);
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
            value: require('./loggers/'+ logger')(function(x) { /*self.log(x);*/ self.logs.push(x); }),
			writable: false
		},

        expect: {
            value: expect,
            writable: false
        },

        logs: {
            value: [],
            writable: false
        },

        currentUrl: {
            get: function() {
                return browser.url;
            }
        }
	});

	this.next = function(fn) {
		if (typeof fn === 'function') {
			promise = promise.then(fn);
		} else if (fn instanceof Promise) {
			promise = promise.then(function() { return fn; });
		}
	};

    this.start = function() {
        this.next(function() { self.logger.testSuiteStarted(name); });
    };

    this.run = function(fn) {
        fn.call({}, self);
    };

    this.end = function() {
        promise = promise.catch(function(e) {
            console.log(e);
        });

        this.next(function() {
            self.logger.testSuiteFinished(name);
        });

        this.next(function() {
            self.logs.forEach(function(line) {
                console.log(line);
            });
        });
    };
};

Test.prototype.step = Test.prototype.check = function(fn) {
	this.next(fn);
};

Test.prototype.checkRule = function(fn) {
    if (typeof fn !== 'function') {
        return;
    }

    var self = this;

    this.next(function() {
        var testName = fn.name;

        if (!testName) {
            var matches = fn.toString().match(/function[\s]+([^\(]+)/);
            if (matches && matches.length === 2) {
                testName = testName || matches[1];
            }
        }

        testName = testName || 'unknown test name';

        self.logger.testStarted(testName);

        try {
            fn.call({
                browser: self.browser,
                expect: expect,
                requests: self.browser.requests,
                logger: self.logger
            });
        }
        catch(e) {
            self.logger.testFailed(testName, e.message);
        }

        self.logger.testFinished(testName);
    });
};

Test.prototype.open = function(url) {
    var self = this;

    this.next(new Promise(function(resolve) {
        self.browser.open(url, resolve);
    }));

	return this;
};

Test.prototype.waitUntilPageLoaded = function() {
    var self = this;

    this.next(function() {
        self.browser.clearRequests();

        return new Promise(function(resolve) {
            self.browser.waitUntilPageLoaded(resolve);
        });
    });

    return this;
};

Test.prototype.wait = function(millis) {
    this.next(function() {
        return new Promise(function(resolve) {
            setTimeout(resolve, millis);
        });
    });
};

Test.prototype.action = function() {
	var self = this;
    var args = Array.prototype.slice.call(arguments);

	this.next(function() { self.browser.action.apply(self.browser, args); });

    return this;
};

Test.prototype.click = function(selector) {
    var self = this;

    this.next(function() {
        self.browser.click(selector);
    });
};

Test.prototype.clearRequests = function() {
	var self = this;
	this.next(function() {
		self.browser.clearRequests();
	});
};

Test.prototype.fillForm = function(formSelector, values) {
    // TODO
};

Test.prototype.log = function(x) {
	var self = this;
	this.next(function() {
        console.log(x);
	});

	return this;
};

module.exports = Test;