var testCase = require('./testCase');

module.exports = {
	TestCase: testCase.TestCase,
	start: testCase.start,
	rules: require('./rules')
};