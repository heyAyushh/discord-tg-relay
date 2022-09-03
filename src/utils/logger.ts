import pino from 'pino';
const isDevelopment = process.env.NODE_ENV === 'development';

const getLogger = () => (isDevelopment ? pino({
  level: process.env.DEV_LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
     colorize: true,
    },
   },
  timestamp: true,
 }) : pino({
  level: process.env.PROD_LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
 }));

// useMetadata: true,

// catch all the ways node might exit

const logger = getLogger();


export default logger;
