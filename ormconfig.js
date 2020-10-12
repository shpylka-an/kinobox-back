// only typeorm-seeding requires this config
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  seeds: ['dist/**/*.seeder{.ts,.js}'],
  factories: ['dist/**/*.factory{.ts,.js}'],
  synchronize: true,
  logging: true,
}
