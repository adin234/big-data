'use strict'

const mockaroo = require('mockaroo');
const mysql = require('mysql');
const config = require('./config');
const client = new mockaroo.Client({
    apiKey: config.mockaroo_key
});

const conn = mysql.createConnection({
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
});

conn.connect();

client.generate({
    count: 1000,
    schema: 'bookschema'
}).then( (data) => {
    data.forEach( (item) => {
        conn.query('INSERT INTO book SET ?', item, (err, res) => {
            if (err) {
                return console.error('error on database insertion: ' + err.stack);
            }
        });
    });
    conn.end();
});
