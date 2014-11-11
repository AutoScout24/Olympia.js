function escape(str) {
    return String(str).replace(/'/g, "|'");
}

module.exports = function(log) {
    return  {
        testSuiteStarted: function (name) {
            log("suite '" + escape(name) + "' started");
        },
        testSuiteFinished: function (name) {
            log("suite '" + escape(name) + "' finished");
        },
        testStarted: function (name) {
            log("\t started " + escape(name) + " test");
        },
        testFinished: function (name) {
            log("\t succeeded " + escape(name) + " test");
        },
        testFailed: function (name, message) {
            log("=====> failed " + escape(name) + " test | message='" + escape(message) + "'");
        }
    }
};
