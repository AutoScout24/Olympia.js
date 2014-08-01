var system = require('system');

var args = {
	teamcity: false,
	verbose: false,
	help: false
};

system.args.forEach(function(arg) {
	switch(arg) {
		case '-t':
		case '--teamcity':
			args.teamcity = true;
			break;

		case '-v':
		case '--verbose':
			args.verbose = true;
			break;

		case '-h':
		case '--help':
			args.help = true;
			break;
	}
});

if (args.help) {
    console.log('Testing Framework for Tracking and SEO');
    console.log('Usage:');
    console.log('        -h        --help            Help');
    console.log('        -v        --verbose         Verbose output');
    console.log('        -t        --teamcity        Reporting for Teamcity');
    phantom.exit();
}

module.exports = args;
