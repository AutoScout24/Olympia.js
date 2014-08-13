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
        },

        url: {
            get: function() {
                return this.page.url;
            }
        }
    });

    this.page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36 Olympia.js Test Framework';
    this.page.onResourceRequested = function(requestData) {
        requests.push(requestData);
    };

    this.page.onNavigationRequested = function(url, type, willNavigate, main) {
        //console.log('!!!!!!!!', url);
    };

    this.clearRequests = function() {
        requests.length = 0;
    };
};

Browser.prototype.waitUntilPageLoaded = function(callback) {
    var to = setTimeout(callback, 10000);

    this.page.onLoadFinished = function(state) {
        if (state === 'success') {
            clearTimeout(to);
            setTimeout(callback, 3000);
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

Browser.prototype.action = function() {
    return this.page.evaluate.apply(this.page, arguments);
};

Browser.prototype.click = function(selector) {
    this.page.evaluate(function(selector) {
        
        var node = document.querySelector(selector);

        if (node) {
            var eventClass = "MouseEvents";
            var event = document.createEvent(eventClass);
            event.initEvent('click', true, true);
            event.synthetic = true;
            node.dispatchEvent(event, true);
        }

    }, selector);
};

module.exports = Browser;