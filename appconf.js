var configEnv = {
    port: process.env.PORT,
    mysql: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        userID: process.env.MYSQL_USERID,
        userPassword : process.env.MYSQL_USER_PW,
        database : process.env.MYSQL_DB_NAME,
        connectionLimit : process.env.MYSQL_CONNECTION_LIMIT 
    },
};
var config = configEnv;

module.exports = config;