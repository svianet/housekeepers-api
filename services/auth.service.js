'use strict';

const authsignal = require("./authsignal");
const db = require("../models");
const Account = require("../models/account.model.js")(db.sequelize);

const checkAuthetication = async (userId) => {    
    const result = await authsignal.getUser({ userId: userId });
    if (result.isEnrolled) {
        console.log('LOGGED');
        // The user has set up MFA and can be challenged
        // @todo use only the user table and get configuration in other request
        let account = {};
        let sql = `select account.email, account.account_status, account.failed_access, account.user_id, account.pers_id, account.unique_user_id
                , person.first_name, person.last_name, person.gender, person.image_url, user_role.role_id
            from account
            left join person on person.pers_id = account.pers_id
            left join user_role on user_role.user_id = account.user_id
            where account.email = :email`;
        await db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
            replacements: {
                email: result.email
            }
        }).then(async (data) => {
            //console.log("data:", data);
            if (data.length > 0) {
                // update uniqueUserId
                if (!data[0].unique_user_id) {
                    data[0].unique_user_id = result.userId;
                }
                account = data[0];
            } else {
                // add new user without profile
                account = await Account.create({ 
                    email: result.email,
                    unique_user_id: userId
                });
                //console.log(account);
            }
        })
        .catch(err => {
            throw err;
        });
        console.log(account);
        return { success: true, data: account };
    } else {
        return { success: false };
    }
}

module.exports = {
    checkAuthetication
};