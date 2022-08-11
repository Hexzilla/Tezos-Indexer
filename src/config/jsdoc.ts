import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	swaggerDefinition: {
		// Like the one described here: https://swagger.io/specification/#infoObject
		info: {
			title: 'PiXL API',
			version: '0.1.0',
			description: 'The API Documentation for the PiXL API',
		},
	},
	// List of files to be processes. You can also set globs './routes/*.js'
	apis: ['./src/routers/**/**.ts'],
};

export default swaggerJsdoc(options);
