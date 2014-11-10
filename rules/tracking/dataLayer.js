var expect = require('chai').expect;


module.exports = function(params) {
    function checkDataLayer() {
        var dataLayer = this.browser.action(function() { return window.dataLayer; });

        expect(dataLayer).to.exists;

        dataLayer = Array.prototype.slice.apply(dataLayer);

        for (var paramName in params) {
            var value = params[paramName];
            var found = false;
            var exact = false;

            for (var i = 0, l = dataLayer.length; i < l; i++) {
                if (paramName in dataLayer[i]) {
                    found = true;
                    exact = exact || dataLayer[i][paramName] === params[paramName];
                }
            }

            expect(found).to.equal(true, 'Variable name not found in dataLayer: ' + paramName);
            expect(exact).to.equal(true, 'Variable in dataLayer has incorrect value: ' + paramName);
        }
    }

    checkDataLayer.name = 'Data Layer Test';

    return checkDataLayer
};
