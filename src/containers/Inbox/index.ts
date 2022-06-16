import express from 'express';

import v1 from './v1';

export default (app: express.Application): void => {
  v1(app);
};
