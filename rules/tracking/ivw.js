function getURLParameter(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null
}

module.exports = function(params) {
    function ivw() {
        // https://de.ioam.de/tx.io?st=mobaus24&cp=as24%2Fde%2Fall-webapp%2Fall%2Fhome&sv=ke&co=&pt=CP&rf=&r2=&ur=m1.autoscout24.de&xy=320x568x24&lo=DE%2FBayern&cb=000a&vr=305&id=drqasq&lt=1407162668703&ev=&u2=http%3A%2F%2Fm1.autoscout24.de%2F&cs=7yys8f&mo=1&yf=12&ls2=0002425d3e2ee7bae5329c97b0001
        var ivwRequests = this.browser.requests.filter(function(item) {
            return /de.ioam.de\/tx.io/.test(item.url);
        });

        var ok = ivwRequests.length;

        if (ivwRequests.length === 2) {
            var url1 = ivwRequests[0].url;
            var url2 = ivwRequests[1].url;
            var diff = url1.length > url2.length ? url1.replace(url2, '') : url2.replace(url1, '');

            this.expect(diff).to.equal('&sr=71', 'There are sometimes two requests to IVW. If they differ, then they should only differ in one parameter. Dont ask why...');
        } else {
            this.expect(ivwRequests.length).to.equal(1, 'There should be exactly one IVW request.');
        }

        for (var key in params) {
            var expectedParam = params[key];
            var param = getURLParameter(ivwRequests[0], key);

            this.expect(expectedParam === param, 'Param expected to be: "' + expectedParam + '", but it was: "' + param + '"');
        }
    }

    ivw.name = 'IVW Tracking';

    return ivw;
};