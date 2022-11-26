const db = require('../config/db');

class Model {
  constructor(table) {
    this.db = db;
    this.table = table;
  }
  async select(columns, where) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (where) query += where;
    return this.db.query(query);
  }
  async insert(data) {
    let fields = data.keys;
    let values = data.values;
    let query = `INSERT INTO ${this.table} (${fields} values (${values})`;
    return this.db.query(query);
  }
}
module.exports = Model;
