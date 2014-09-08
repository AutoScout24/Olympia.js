function getURLParameter(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20')) || null;
}

module.exports = function(params) {
    function googleAnalyticsEvent() {

        var gaRequests = this.browser.requests.filter(function(item) {
            return /google-analytics.com\/collect/.test(item.url);
        });

        var eventRequests = gaRequests.filter(function(req) {
            return getURLParameter(req.url, 't') === 'event' && getURLParameter(req.url, 'tid') === params.trackerId;
        });

        this.expect(eventRequests.length).to.equal(1, 'There should be exactly one event request to this tracker: "' + params.trackerId + '".');

        var url = eventRequests[0].url;
        
        for (var key in params.params) {
            var value = getURLParameter(url, key);
            var expected = params.params[key];
            this.expect(value, expected, 'Expected parameter: ' + key + ' to be: "' + expected + '", but it was: ' + value);
        }
    }

    googleAnalyticsEvent.name = 'Google Analytics Event';

    return googleAnalyticsEvent;
};