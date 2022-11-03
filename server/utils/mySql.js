const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: '127.0.0.1',
    user: 'root',
    password: '010423',
    database: 'ens'
})


const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, params, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result)
                    }
                })
            }
        })
    })
}

module.exports = query