module.exports = function(params) {
    function checkMainElements() {
        this.expect(this.browser.querySelectorAll('title').length).to.equal(1, 'There should be exactly one title element on the page.');
        this.expect(this.browser.querySelectorAll('meta[name=description]').length).to.equal(1, 'There should be exactly one meta description on the page.');
    };

    checkMainElements.name = 'SEO Test - Check Main Elements';

    return checkMainElements;
};