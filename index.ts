import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './src/db';
// import { databaseRelations } from "./src/models";

const mustacheExpress = require('mustache-express');

const app = express();
dotenv.config();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(5001);
require('child_process').exec('redis-cli FLUSHALL', (error, stdout, stderr) => {
  const lines = stdout.split('\n');
  console.log('REDIS CLEAN : ', lines);
});
io.emit('greetings', { msg: "I'm server" });
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(
  bodyParser.json({
    limit: '20mb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true,
  })
);
const redisPORT = Number(process.env.REDIS_PORT || 6379);

const middleWares = () => {
  app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));
  app.use(bodyParser.urlencoded({ extended: true }));
  sequelize
    .sync({ alter: true })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
    app.use(
      cors({
        credentials: true,
        origin: /^http:\/\/localhost/,
      })
    );
  } else {
    app.use(morgan('combined'));
    const allowedOrigins = ['http://localhost:5000', 'http://localhost:5010'];
    app.use(
      cors({
        credentials: true,
        origin: function (origin, callback) {
          // allow requests with no origin
          // (like mobile apps or curl requests)
          // return callback(null, true);
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
      })
    );
  }
};
middleWares();
// initializeCache(redisPORT);
// databaseRelations();
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(cors());
// intializeDB();
app.use(compression());
app.use(helmet());
app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', mustacheExpress());
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', '../src/views');
console.log(__dirname);
app.use('/', require('./server/routes'));
app.listen(app.get('port'), '0.0.0.0');
globalThis.INSTANCES = [];

globalThis.LI_SETTINGS = {};
globalThis.LI_CONNECTED_STATUS = {};
globalThis.LI_REPLIED_STATUS = {};
globalThis.LI_RELOGIN_REQUIRED = {};
globalThis.LI_PROXY = {};
globalThis.LI_COOKIES = {};
globalThis.LI_PROFILE_LINK = {};
// Key is BrowserKey
globalThis.CMP_TARGETS = {}; // key is browserKey
globalThis.PROGRESSING_TAR_CNT_PER_CMP = [];
process.setMaxListeners(0);
module.exports = app;
