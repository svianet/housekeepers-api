//const db = require('../config/db');

// User constructor
function User({ user_id, email}) {
  this.user_id = user_id;
  this.email = email;
}

// add a createUser method to the prototype
// User.prototype.createUser = async function () {
//   try {
//     const { rows } = await db.query(
//       `INSERT INTO public.account (user_id, email) 
//             VALUES ($1, $2)`,
//       [this.user_id, this.email]
//     );
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = User;
