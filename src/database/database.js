const mysql = require('mysql');

// const connect = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Sseeaways1',
//     database: "admin_products"
// });
const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root_steam',
    password: '504&aygT',
    database: "app_steam"
});

// const connect = mysql.createConnection({
//      host: 'localhost',
//      user: 'root',
//      password: 'sseeaways',
//      database: "datatest"
//  });
module.exports.connect = connect