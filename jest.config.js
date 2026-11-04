const nextJest = require('next/jest');

module.exports = nextJest({dir: './'})({
	testEnvironment: 'node',
	resolver: `${__dirname}/jest-resolver.js`,
});
