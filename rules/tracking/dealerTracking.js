function getURLParameter(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null
}

module.exports = function(params) {
	function dealerTracking() {
        var trackingRequests = this.browser.requests.filter(function(item) {
            return /tracking.autoscout24.com\/parser.ashx/.test(item.url);
        });

        this.expect(trackingRequests.length).to.be.above(0, 'No dealer tracking requests found.');

        var exactRequests = trackingRequests;

        for (var key in params) {
        	exactRequests = exactRequests.filter(function(req) {
        		return getURLParameter(req.url, key) === String(params[key]);
        	});
        }

        this.expect(exactRequests.length).to.equal(1, 'Expected only 1 initiated tracking request, but found: ' + exactRequests.length);
	};

	dealerTracking.name = 'Delaer Tracking';

	return dealerTracking;
};