module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ayush',
  database: 'tokenwise',
  synchronize: true,
  logging: false,
  entities: ['src/models/**/*.ts'],
};
