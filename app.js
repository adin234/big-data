'use strict'

const mockaroo = require('mockaroo');
const mysql = require('mysql');
const config = require('./config');
const client = new mockaroo.Client({
    apiKey: config.mockaroo_key
});
const promised_data = client.generate({
        count: 1000,
        schema: 'bookschema'
});
const conn = mysql.createConnection({
    host: 'localhost',
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

function start() {
    conn.connect();
    
    promised_data.then( (data) => {
        data.forEach(isert_item);
    });
    
    conn.end();

}

function insert_item (item) {
    conn.query('INSERT INTO book SET ?', item, (err, res) => {
        if (err) {
            return console.error('error on database insertion: ' + err.stack);
        }
    });
}

start();
