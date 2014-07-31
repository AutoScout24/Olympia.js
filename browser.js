var webPage = require('webpage');
var Promise = require('bluebird');

var Browser = function() {
    if (!this instanceof Browser) {
        return new Browser();
    }

    var page = webPage.create();

    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36 TestFramework';

    var requests = [];

    Object.defineProperties(this, {
        page: {
            value: page,
            writable: false
        },

        requests: {
            get: function() {
                return requests.splice();
            }
        },

        title: {
            get: function() {
                return this.action(function() { return document.title; });
            }
        }
    });

    this.page.onResourceRequested = function(requestData) {
        requests.push(requestData);
    };

    this.clearRequests = function() {
        requests.length = 0;
    };

    
    page.onNavigationRequested = function(url, type, willNavigate, main) {
        //console.log('Trying to navigate to: ' + url);
        //console.log('Caused by: ' + type);
        //console.log('Will actually navigate: ' + willNavigate);
        //console.log('Sent from the page\'s main frame: ' + main);
    }
    
};

Browser.prototype.waitUntilPageLoaded = function() {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.page.onLoadFinished = function(state) {
            if (state === 'success') {
                setTimeout(function() {
                    resolve(self);
                }, 1000);
            } else {
                reject(new Error('Unable to load page'));
            }
        };
    });
};

Browser.prototype.open = function(url) {
    this.page.open(url);
    return this.waitUntilPageLoaded();
};

Browser.prototype.action = function(fn) {
    return this.page.evaluate(fn);
};

module.exports = Browser;