const AdminUser = require('nestjs-admin').AdminUserEntity
const dbConfig = config.get('db');
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: dbConfig.host,
  port: dbConfig.env.port,
  username: dbConfig.env.username,
  password: dbConfig.env.password,
  database: dbConfig.env.database,
  entities: [__dirname + '/dist/**/*.entity.js', AdminUser],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  synchronize: false,
}