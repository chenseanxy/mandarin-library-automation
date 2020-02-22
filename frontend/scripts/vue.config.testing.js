module.exports = {
    devServer: {
        proxy: 'http://api:5000',
        port: '8080',
        allowedHosts: ['testrunner']
    }
}