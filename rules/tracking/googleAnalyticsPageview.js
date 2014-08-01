function getURLParameter(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null
}

module.exports = function(params) {
    function googleAnalyticsPageview() {

        var gaRequests = this.browser.requests.filter(function(item) {
            return /google-analytics.com\/collect/.test(item.url);
        });

        var pageViewRequests = gaRequests.filter(function(req) {
            return getURLParameter(req.url, 't') === 'pageview' && getURLParameter(req.url, 'tid') === params.trackerId;
        });

        this.expect(pageViewRequests.length).to.equal(1, 'There should be exactly one page view request to this tracker: "' + params.trackerId + '".');

        var foundPageName = decodeURIComponent(getURLParameter(pageViewRequests[0].url, 'dp')).split('?')[0];

        this.expect(foundPageName).to.equal(params.pageName, 'Unexpected page name.')
    };

    googleAnalyticsPageview.name = 'Google Analytics Page View'

    return googleAnalyticsPageview;
};