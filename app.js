var mockaroo = require('mockaroo'),
    mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2012-01065',
    database: 'db1',
});
conn.connect();
var client = new mockaroo.Client({
    apiKey: '7f19c440'
});
client.generate({
    count: 1000,
    schema: 'bookschema'
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        conn.query('INSERT INTO book SET ?', data[i], function(err, res) {
            if(err) {
                console.error('error on database insertion: ' + err.stack);
                return;
            }
        });
    }
    conn.end();
});
