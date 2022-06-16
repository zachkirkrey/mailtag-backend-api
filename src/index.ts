import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import aws from 'aws-sdk';

import userAgent from 'express-useragent';
import 'dotenv/config';

import CONFIG from '@/config';
import routes from '@/routes';
import Models from '@/models';
import cors from 'cors';
// import "./jobs";
import moment from 'moment';

import { app, httpServer } from './server';
import sequelize from '@/models/sequelize';

// Include the cluster module

import cluster from 'cluster';
import os from 'os';
import Middleware from 'middleware';

// const testDBConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("DB connected");
//     await processSync();
//     await Models.Users.findAll();
//   } catch (err) {
//     console.log(err);
//   }
// };

// testDBConnection();

// const processSync = async () => {
//   try {
//     await sequelize.sync({
//       force: true,
//     });

//     // await faker();
//   } catch (err) {
//     console.log("sync err", err);
//   }
// };

// Code to run if we're in the master process
if (cluster.isMaster && false) {
  // Count the machine's CPUs
  const cpuCount = process.env.ENV === 'dev' ? 2 : os.cpus().length;
  console.log('cpu count', cpuCount);
  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    if (i === 1) {
      // processSync();
    }
    cluster.fork();
  }

  // Listen for terminating workers
  cluster.on('exit', function (worker) {
    console.log('died worker id', worker.id);
    cluster.fork();
  });

  // Code to run if we're in a worker process
} else {
  moment.prototype.formatDefault = function () {
    return this.format('YYYY-MM-DD HH:mm:ss');
  };

  aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  });

  app.use(cors());

  app.use(logger('dev'));
  //app.use(Middleware.auth);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: false }));

  app.use(cookieParser());
  app.use(userAgent.express());
  // app.use(express.static(path.join(__dirname, "public")));

  routes(app);
  app.use((err, req, res, next) => {
    console.log(err.stack);
    next(err);
  });

  // Optional fallthrough error handler
  // app.use(function onError(err, req, res, next) {
  //     // The error id is attached to `res.sentry` to be returned
  //     // and optionally displayed to the user for support.
  //     res.statusCode = 500;
  //     res.end(res.sentry + '\n');
  // });

  httpServer.listen(CONFIG.PORT);
}
