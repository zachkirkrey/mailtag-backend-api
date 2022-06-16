import { Sequelize } from 'sequelize';
import config from '@/config';

const sequelize = new Sequelize(config.DATABASE.NAME, config.DATABASE.USERNAME, config.DATABASE.PASSWORD, {
  host: config.DATABASE.HOST,
  port: +config.DATABASE.PORT,
  dialect: 'postgres',
  logging: (msg) => console.log(msg),
});

export default sequelize;
