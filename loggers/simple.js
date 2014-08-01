module.exports = {
	logTestSuiteStarted: function(name) {
        this.redTests = 0;
        this.greenTests = 0;
        console.log("test suite " + name +  " started");
	},
	logTestSuiteFinished: function(name) {
        console.log("test suite " + name +  " finished \r\n{passed: " + this.greenTests + " failed: " + this.redTests + " total: " + (this.greenTests + this.redTests) + "}");
	},
	logTestStarted: function(name) {
	},
	logTestFinished: function(name) {
        this.greenTests ++;
        console.log("\t test passed");
	},
	logTestFailed: function(name, message) {
        this.redTests ++;
		console.log("\t " + name + " failed: \r\n\t\t" + message);
	},
	log: function(message) {
		console.log(message);
	}
};
