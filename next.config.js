const path = require('path');

module.exports = {
    reactStrictMode: process.env.NODE_ENV === 'production' ? false : true,
    trailingSlash: true,
    publicRuntimeConfig: {
        appVersion: process.env.npm_package_version || ''
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    async redirects() {
        return [
            {
                source: '/setup',
                destination: '/installation',
                permanent: true
            }
        ];
    },

    // Add static export configuration
    target: 'experimental-serverless-trace',
    // Specify the output directory
    output: {
        path: path.resolve(__dirname, 'out'),
        publicPath: '/out/'
    }
};
