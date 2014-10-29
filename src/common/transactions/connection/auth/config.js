var Confidence = require("confidence");

var store = new Confidence.Store({
    provider: {
        $filter: 'env',
        production: {
            jwt: {
                tokensecret:'freddyfender',
                jwtoptions: { expiresInMinutes: 60*5 }
            },
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: '', // fill in your FB ClientId here
                clientSecret: '', // fill in your FB Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: 'yourclientid.apps.googleusercontent.com', // fill in your Google ClientId here
                clientSecret: 'yoursecret', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        },
        test: {
            jwt: {
                tokensecret:'samthesham',
                jwtoptions: { expiresInMinutes: 60*5 }
            },
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: '', // fill in your FB ClientId here
                clientSecret: '', // fill in your FB Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: '', // fill in your Google ClientId here
                clientSecret: '', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        }, // this is the default configuration if no env.ENVIRONMENT varaible is set.
        $default: {
            jwt: {
                tokensecret:'elvis',
                jwtoptions: { expiresInMinutes: 60*5 }
            },
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: '', // fill in your FB ClientId here
                clientSecret: '', // fill in your FB Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: 'yourclientid.apps.googleusercontent.com', // fill in your Google ClientId here
                clientSecret: 'yoursecret', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        }
    }
});

var criteria = {
    env: process.env.ENVIRONMENT
};

exports.get = function(key) {
    return store.get(key, criteria);
};
