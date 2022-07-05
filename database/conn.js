const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '34.142.170.226',
    user: 'root',
    password: 'Pq.26102204',
    database: 'ShopToanThuy'
})

module.exports = connection;
