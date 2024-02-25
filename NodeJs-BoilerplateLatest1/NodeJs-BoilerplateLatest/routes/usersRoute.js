const express = require('express')
const router = express()
const userVerifyToken = require("../helpers/jwt").verifyTokenUser


/**
 * IMPORT CONTROLLER 
 */
const {
    createUser,
    usersList,
    getByUserid,
    updateUser,
    deleteUser,
    loginUser,
    userForgotpassword
} = require('../controller/userController/index')

/**
 * REGISTER USER
 */
router.post('/',
    async(req, res) => {
        try {
            var ctrlResponse = await createUser.create(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * USERS LIST
 */
router.get('/',
    async(req, res) => {
        try {
            var ctrlResponse = await usersList.findAll(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * LOGIN USER
 */
router.post('/login',
    async(req, res) => {
        try {
            var ctrlResponse = await loginUser.login(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * USER DETAIL
 */
router.get('/:id', userVerifyToken,
    async(req, res) => {
        try {
            var ctrlResponse = await getByUserid.findById(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * UPDATE USER
 */
router.put('/:id', userVerifyToken,
    async(req, res) => {
        try {
            var ctrlResponse = await updateUser.update(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })


/**
 * DELETE USER
 */
router.delete('/:id', userVerifyToken,
    async(req, res) => {
        try {
            var ctrlResponse = await deleteUser.delete(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * USER FORGOT PASSWORD
 */
router.post('/forgotPassword',
    async(req, res) => {
        try {
            var ctrlResponse = await userForgotpassword.userForgotPassword(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })


/**
 * FORGOT PASSWORD : CHANGE PASSWORD PAGE REDIRECTION
 * @param  {id} '/(
 */
router.get('/(:id)/password/(:time)/(:mailid)',
    async(req, res) => {
        res.render('../public/pages/changePassword.ejs')

    })

/**
 * FORGOT PASSWORD : SUCCESS PAGE REDIRECTION
 * @param  {userid} '/(
 */
router.get('/(:userid)/success',
    async(req, res) => {
        res.render('../public/pages/success.ejs')
    })

/**
 * FORGOT PASSWORD : FAILURE PAGE REDIRECTION
 * @param  {} '/(
 */
router.get('/(:userid)/failure',
    async(req, res) => {
        res.render('../public/pages/failure.ejs')
    })

/**
 * FORGOT PASSWORD : LINK EXPIRED PAGE REDIRECTION
 * @param  {} '/link/expired'
 */
router.get('/link/expired',
    async(req, res) => {
        res.render('../public/pages/linkExpired.ejs')
    })

/**
 * FORGOT PASSWORD : EMAIL EXIST AND EXPIRE TIMEOUT CHECK API
 * @param  {} '/check/mail/(
 */
router.get('/check/mail/(:adminId)/(:mailId)/(:timestamp)',
    async(req, res) => {
        try {
            var email = (req.params.adminId).toString();
            var randomString = (req.params.mailId).toString();
            var timestamp = (req.params.timestamp)
            var ctrlResponse = await userForgotpassword.userForgotPasswordCheckMail(email, randomString, timestamp);
            if (ctrlResponse == true) {
                res.send({ code: 200 })
            } else {
                res.send({ code: 400 })
            }
        } catch (e) {
            res.send({ status: 400, error: e.message })
        }
    })

/**
 * FORGOT PASSWORD : RESET PASSWORD
 */
router.post('/password/(:adminId)/(:password)',
    async(req, res) => {
        try {
            var email = (req.params.adminId).toString();
            var password = (req.params.password);
            var ctrlResponse = await userForgotpassword.userForgotPasswordResetPassword(email, password);
            if (ctrlResponse == true) {
                res.send({ code: 200 })
            } else {
                res.send({ code: 400 })
            }
        } catch (e) {
            res.send({ status: 400, error: e.message })
        }
    })
module.exports = router