var environments = {};

environments.development = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'development',
};

environments.production = {
    'httpPort': 8000,
    'httpsPort': 8001,
    'envName': 'production',
};

var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase(): '';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.development;

module.exports = environmentToExport;