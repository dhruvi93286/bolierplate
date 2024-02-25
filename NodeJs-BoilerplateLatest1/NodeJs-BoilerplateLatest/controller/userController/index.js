const createUser = require('./create');
const usersList = require('./list');
const getByUserid = require('./getByid');
const updateUser = require('./update');
const deleteUser = require('./delete');
const loginUser = require('./login');
const userForgotpassword = require('./userForgotPassword');



module.exports = {
    createUser,
    usersList,
    getByUserid,
    updateUser,
    deleteUser,
    loginUser,
    userForgotpassword,

}