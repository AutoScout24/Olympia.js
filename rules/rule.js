module.exports = function (rule) {
	return function() {
		return function() {
			return rule.apply({}, arguments);
		}
	}
}