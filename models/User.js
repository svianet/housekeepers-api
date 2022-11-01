const db = require('../config/db');

// User constructor
function User({ username, email, password, bio = `Hi, I am ${username}` }) {
  this.username = username;
  this.email = email;
  this.password = password;
  this.bio = bio;
}

// add a createUser method to the prototype
User.prototype.createUser = async function () {
  try {
    const { rows } = await db.query(
      `INSERT INTO users(username, email, password, bio) 
            VALUES ($1, $2, $3, $4)`,
      [this.username, this.email, this.password, this.bio]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
