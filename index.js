import server from './src/api/server.js';
import logger from './src/common/lib/winston/logger.js';

server.start().catch((err) => {
	logger.log({
		level: 'error',
		message: err.message,
	});

	process.exit();
});
