var mockaroo = require('mockaroo'),
    mysql = require('mysql');
if(!process.argv[2] || !process.argv[3] || !process.argv[4]) {
    console.error('Missing argument. Format : node app <username> <password> <dbname>');
    return;
}
var conn = mysql.createConnection({
    host: 'localhost',
    user: process.argv[2],
    password: process.argv[3],
    database: process.argv[4],
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
