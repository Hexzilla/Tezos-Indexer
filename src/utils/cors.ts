import cors, { CorsOptions } from 'cors';
import { ENVIRONMENT } from "../utils/secrets";

const getApplicationAllowedOrigins = (): string[] => {
	const env = ENVIRONMENT;

	switch (env) {
		case 'production':
			return [
				'https://pixl.xyz',
				'https://beets-staging.netlify.app',
				'https://pixl-game.netlify.app',
				'https://pixl-staging.netlify.app',
				'https://pixl-admin.netlify.app'
			];
		case 'development':
		default:
			return [
				'http://localhost:3000',
				'http://localhost:3001',
				'https://pixl-game.netlify.app',
				'https://pixl-staging.netlify.app',
				'https://pixl-admin.netlify.app'
			];
	}
};

const AppliationCorsOptions: CorsOptions = {
	origin: getApplicationAllowedOrigins(),
	methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
	optionsSuccessStatus: 200,
};

//export default cors(AppliationCorsOptions);
export default cors({
	origin: '*'
});
