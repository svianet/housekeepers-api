const env = process.env;
module.exports = {
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT
}