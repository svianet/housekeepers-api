const db = require('../config/db');

// User constructor
function User({ user_id, email, password}) {
  this.user_id = user_id;
  this.email = email;
  this.password = password;
}

// add a createUser method to the prototype
User.prototype.createUser = async function () {
  try {
    const { rows } = await db.query(
      `INSERT INTO public.user (user_id, email, password) 
            VALUES ($1, $2, $3)`,
      [this.user_id, this.email, this.password]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
