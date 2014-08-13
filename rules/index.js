module.exports = {
    tracking: {
        googleAnalyticsPageview: require('./tracking/googleAnalyticsPageview'),
        ivw: require('./tracking/ivw'),
        dealerTracking: require('./tracking/dealerTracking')
    },
    seo: {
        mainElements: require('./seo/mainElements')
    }
};