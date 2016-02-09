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

const maxData = 1000;
let i = 0;

function start () {
    conn.connect();
    generateData();
}

function generateData() {
    client.generate({
        count: maxData,
        schema: config.db.schema
    }).then(insertData);
}

function insertData (data) {
    data.forEach( (item) => {
        conn.query('INSERT INTO book SET ?', item, end);
    });
}

function end (err, res) {
    ++i;
    
    if (err) {
        return console.error('error on database insertion: ' + err.stack);
    }
    
    if (i === maxData) {
        conn.end();
    }
}

start();
