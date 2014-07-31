var expect = require('chai').expect;
var rule = require('./rule');

module.exports = rule(function(txt) {

	console.log(this);

	console.log('IVW');
	console.log(txt);
	expect(5).to.equal(5);
});