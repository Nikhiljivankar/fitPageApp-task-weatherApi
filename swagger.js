const swaggerAutogen = require('swagger-autogen')();

// swagger config
const doc = {
	info: {
		title: 'India Running API',
		description: 'Swagger Documentation for India Running weather API',
	},
	schemes: ['http', 'https'],
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
