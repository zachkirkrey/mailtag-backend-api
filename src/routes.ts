import Models from '@/models';
import express from 'express';

import Dashboard from './containers/Dashboard';
import Auth from './containers/Auth';
import Email from './containers/Email';
import Inbox from './containers/Inbox';
import Pings from './containers/Pings';
import Settings from './containers/Settings';
import Payment from './containers/Payment';
import StripePayment from 'services/StripePayment';

export default (app: express.Application): void => {
  Dashboard(app);
  Auth(app);
  // Email(app);
  // Inbox(app);
  // Pings(app);
  // Settings(app);
  // Payment(app);
  app.post('/stripe-webhook', StripePayment.webhook);
  app.get('/api/start', (req, res) => res.json('OK ____'));
  app.get('/api/version', (req, res) => res.json(`001 ${process.env.NODE_ENV}`));
  app.get('/api/test', async (req, res) => {
    try {
      const data = await Models.Users.findAll();
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'failed' });
    }
  });
};
