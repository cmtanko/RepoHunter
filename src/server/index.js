import './env';
import express from 'express';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

const app = express();
const APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '3000' ;
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../../public')));

app.use('/', routes);
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log('info', `server started at http://${app.get('host')}:${app.get('port')}`);
});

