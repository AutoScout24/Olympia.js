var webPage = require('webpage');

var Browser = function() {
    if (!this instanceof Browser) {
        return new Browser();
    }

    var requests = [];

    Object.defineProperties(this, {
        page: {
            value: webPage.create(),
            writable: false
        },

        requests: {
            get: function() {
                return requests.slice();
            }
        },

        title: {
            get: function() {
                return this.action(function() { return document.title; });
            }
        }
    });

    this.page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36 Olympia.js Test Framework';
    this.page.onResourceRequested = function(requestData) {
        requests.push(requestData);
    };

    this.clearRequests = function() {
        this.next(function() {
            requests.length = 0;
        });
    };
};

Browser.prototype.waitUntilPageLoaded = function(callback) {
    this.page.onLoadFinished = function(state) {
        if (state === 'success') {
            setTimeout(callback, 1000);
        } else {
            callback(new Error('Unable to load page'));
        }
    };
};

Browser.prototype.querySelectorAll = function(selector) {
    return this.page.evaluate(function(selector) {
        return document.querySelectorAll(selector);
    }, selector);
};

Browser.prototype.open = function(url, callback) {
    this.page.open(url);
    this.waitUntilPageLoaded(callback);
};

Browser.prototype.action = function(fn) {
    return this.page.evaluate(fn);
};

module.exports = Browser;