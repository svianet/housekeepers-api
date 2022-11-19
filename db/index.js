require('dotenv').config();
const db = require('../config/db');
const fs = require('fs');

const seedQuery = fs.readFileSync("db/seed.sql", {
    encoding: "utf-8"
});

// run seed query
db.query(seedQuery, null, error => {
    if (error) {
        throw error;
    }
});