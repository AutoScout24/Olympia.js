function getURLParameter(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null
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

        var foundPageName = decodeURIComponent(getURLParameter(eventRequests[0].url, 'dp')).split('?')[0];

        this.expect(foundPageName).to.equal(params.pageName, 'Unexpected page name.')
    }

    googleAnalyticsEvent.name = 'Google Analytics Event';

    return googleAnalyticsEvent;
};