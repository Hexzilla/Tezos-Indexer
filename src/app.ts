import express from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import helmet from 'helmet';
import compression from 'compression';
import { SESSION_SECRET, APP_PORT } from './utils/secrets';
import { loadErrorHandlers } from './utils/error-handling';
import { MainRouter } from './routes';
import cors from './utils/cors';
import * as raceController from './controllers/race.controller';

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cors);
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use('/', MainRouter);

loadErrorHandlers(app);

console.log('Start controller')
raceController.start();

app
  .listen(APP_PORT, () => {
    console.log(`server running on port : ${APP_PORT}`);
  })
  .on('error', (e) => console.error(e));

export default app;
