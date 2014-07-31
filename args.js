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

module.exports = args;
