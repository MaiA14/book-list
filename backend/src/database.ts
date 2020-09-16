import mysql from 'promise-mysql';
const config = require ('./config')

const pool = mysql.createPool(config);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('mySQL DB is Connected');
    });    

export default pool;
