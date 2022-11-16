'use strict';
//const Model = require('../models/model');
//const User = require('../models/User');

//const userModel = new Model('user');

const getServices = async (req, res, next) => {
  res.status(200).json({ success: true, data: [
    {
      id: 1,
      name: "Bathroom Cleaning"
    },
    {
      id: 2,
      name: "Kitchen Cleaning"
    },
    {
      id: 3,
      name: "General Room Cleaning"
    },
    {
      id: 4,
      name: "Changing bed linens"
    },
] 
});
  // try {
  //   const data = await userModel.select('id, name');
  //   res.status(200).json({ success: true, data: data.rows });
  // } catch (err) {
  //   res.status(200).json({ success: false, error: err.stack });
  // }
};

// const addUser = async (req, res, next) => {
//   const { username, password, email, bio } = req.body;
//   try {
//     const user = new User({ username, password, email, bio });
//     const result = await user.createUser();
//     res.send(user);
//   } catch (error) {
//     const errorToThrow = new Error();
//     switch (error?.code) {
//       case '23505':
//         errorToThrow.message = 'User already exists';
//         errorToThrow.statusCode = 403;
//         break;
//       default:
//         errorToThrow.statusCode = 500;
//     }
//     //pass error to next()
//     next(errorToThrow);
//   }
// };
module.exports = {
  getServices,
};
