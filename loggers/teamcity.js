function escape(str) {
    return String(str).replace(/'/g, "|'");
}

module.exports = function(log) {
    return  {
        testSuiteStarted: function (name) {
            log("##teamcity[testSuiteStarted name='" + escape(name) + "']");
        },
        testSuiteFinished: function (name) {
            log("##teamcity[testSuiteFinished name='" + escape(name) + "']");
        },
        testStarted: function (name) {
            log("##teamcity[testStarted name='" + escape(name) + "']");
        },
        testFinished: function (name) {
            log("##teamcity[testFinished name='" + escape(name) + "']");
        },
        testFailed: function (name, message) {
            log("##teamcity[testFailed name='" + escape(name) + "' message='" + escape(message) + "']");
        }
    }
};
