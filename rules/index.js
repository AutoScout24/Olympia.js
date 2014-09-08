module.exports = {
    tracking: {
        googleAnalyticsPageview: require('./tracking/googleAnalyticsPageview'),
        googleAnalyticsEvent: require('./tracking/googleAnalyticsEvent'),
        ivw: require('./tracking/ivw'),
        dealerTracking: require('./tracking/dealerTracking')
    },
    seo: {
        mainElements: require('./seo/mainElements')
    }
};