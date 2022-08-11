import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ENVIRONMENT, LOG_DIRECTORY } from './secrets';

const logdir = LOG_DIRECTORY;

// Create directory if it is not present
if (!fs.existsSync(logdir)) {
  fs.mkdirSync(logdir);
}

const options = {
  file: {
    level: ENVIRONMENT === 'development' ? 'debug' : 'warn',
    filename: logdir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export default createLogger({
  transports: [
    new transports.Console({
      stderrLevels: ['info', 'error'],
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint()
      ),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
