/**
 * NPM MODULES
 */
const nodemailer = require("nodemailer");
const moment = require('moment');
const CryptoJS = require('crypto-js')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

/**
 * HELPERS
 */
var common = require('../common')
const commonEmail = require('../../services/emailService')

/**
 * DATABASE
 */
const usersCollection = common.db.users;

/**
 * [CREATED BY : NEHA]
 * USER FORGOT PASSWORD
 * @param {Object} req 
 * @returns Object
 */
module.exports.userForgotPassword = async(req) => {
    try {
        if (req.body.email != "" && typeof req.body.email != 'undefined') {

            var userData = await usersCollection.findOne({ where: { email: req.body.email, loginType: 0 } })
            if (userData) {
                var transporter = nodemailer.createTransport({
                    transport: `${process.env.mailTransport}`,
                    host: `${process.env.mailHost}`,
                    port: `${process.env.emailHost}`,
                    debug: true,
                    auth: {
                        user: `${process.env.mailAuthUser}`,
                        pass: `${process.env.mailAuthPassword}`
                    },
                    secure: false,
                    tls: { rejectUnauthorized: false },
                    debug: true
                })
                var date = new Date();
                var milliseconds = date.getTime();

                const randomString = await common.helpers.randomString(30)
                var html = await commonEmail.commenSendEmail(req.body.email, milliseconds, randomString, process.env.usersPath)
                var mailOptions = {
                    from: `'${process.env.projectName}' <${process.env.mailAuthUser}>`,
                    to: req.body.email,
                    subject: 'Your reset password link.',
                    html: html,
                    attachments: [{
                        filename: 'mail.png',
                        path: __dirname + '/../../public/images/mail.png',
                        cid: 'temp'
                    }]
                }
                var mail = await transporter.sendMail(mailOptions);
                if (mail) {
                    var updateArr = {
                        randomString: randomString
                    }

                    await usersCollection.update(updateArr, { where: { email: req.body.email, loginType: 0 } })
                }

            }
            /**
             * SUCCESS MESSAGE
             */
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successResponse(successOrError.forgotPassword, {}, []);

        } else {

            /**
             * EMAIL IS REQUIRED
             */
            var successOrError = common.responseServices.successOrErrors("err_55");
            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
            return common.responseModel.failResponse(successOrError.failMsg, [], [resobj]);

        }

    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var resobj = common.responseModel.resObj(error.message, successOrError.parameters.noParams, successOrError.location);
        return common.responseModel.failResponse(successOrError.failMsg, [], [resobj]);

    }
}

/**
 * USER FORGOT PASSWORD : CHECK EMAIL AND RANDOM STRING
 */
module.exports.userForgotPasswordCheckMail = async(email, randomString, timestamp) => {
    try {
        let emailWithStringExist = await usersCollection.findAll({
            where: {
                email: await common.helpers.decryptData(email),
                randomString: randomString
            }
        });
        let date = new Date(parseInt(timestamp));
        var now = new Date();

        var ms = moment(now, "YYYY-MM-DD HH:mm:ss").diff(moment(date, "YYYY-MM-DD HH:mm:ss"));
        var data = moment.duration(ms);
        if (emailWithStringExist.length > 0 && data._data.days < 1) {
            return true
        } else {
            return false
        }

    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var resobj = common.responseModel.resObj(error.message, successOrError.parameters.noParams, successOrError.location);
        return common.responseModel.failResponse(successOrError.failMsg, [], [resobj]);

    }
}

/**
 *USER FORGOT PASSWORD : RESET PASSWORD
 */
module.exports.userForgotPasswordResetPassword = async(email, password) => {
    try {

        let decryptedPass = CryptoJS.AES.decrypt(decodeURIComponent(password), process.env.ejssecretKey).toString(CryptoJS.enc.Utf8)
        if (decryptedPass.indexOf('"') > -1) {
            pass = decryptedPass.substring(1, decryptedPass.length - 1);
        } else {
            pass = decryptedPass;
        }
        var insertArr = {
            password: bcrypt.hashSync(pass, salt)
        }
        var update = await usersCollection.update(insertArr, { where: { email: await common.helpers.decryptData(email), loginType: 0 } })
        if (update) {
            await usersCollection.update({ randomString: '' }, { where: { email: await common.helpers.decryptData(email), loginType: 0 } });
            return true
        } else {
            return false
        }

    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var resobj = common.responseModel.resObj(error.message, successOrError.parameters.noParams, successOrError.location);
        return common.responseModel.failResponse(successOrError.failMsg, [], [resobj]);

    }
}