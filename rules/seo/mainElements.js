var expect = require('chai').expect;

function titleCheck(params, browser) {
	var skipTitleCheck = 'title' in params && params.title === undefined;
	
	if (!skipTitleCheck) {
    	expect(browser.querySelectorAll('title').length).to.equal(1, 'There should be exactly one title element on the page.');

	    var exactTitleCheck = String(params.title) === params.title;
	    if (exactTitleCheck) {
	    	var pageTitle = browser.querySelectorAll('title')[0].innerText;
	    	expect(pageTitle).to.equal(params.title, 'Different page title was expected.');
	    }
	}
}

function descriptionCheck(params, browser) {
    var skipDescriptionCheck = 'description' in params && params.description === undefined;

    if (!skipDescriptionCheck) {
    	expect(browser.querySelectorAll('meta[name=description]').length).to.equal(1, 'There should be exactly one meta description on the page.');

	    var exactDescriptionCheck = String(params.description) === params.description;
	    if (exactDescriptionCheck) {
	    	var pageDescription = browser.querySelectorAll('meta[name=description]')[0].content;
	    	expect(pageDescription).to.equal(params.description, 'Different meta description expected.');
	    }
	}
}

function h1check(params, browser) {
	var skipH1Check = 'h1' in params && params.h1 === undefined;

	if (!skipH1Check) {
		var h1Tags = browser.querySelectorAll('h1');

		expect(h1Tags.length).to.equal(1, 'There should be exactly one H1 tag on the page.');

		var exactH1Check = String(params.h1) === params.h1;
		if (exactH1Check) {
			expect(h1Tags[0].innerText.replace(/\n/g, ' ').trim()).to.equal(params.h1, 'Different H1 text expected.');
		}
	}
}

module.exports = function(params) {
    function checkMainElements() {
    	titleCheck(params, this.browser);
    	descriptionCheck(params, this.browser);
    	h1check(params, this.browser);
    };

    checkMainElements.name = 'SEO Test - Check Main Elements';

    return checkMainElements;
};