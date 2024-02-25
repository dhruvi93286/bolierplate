const path = require('path');
const constant = require('../config/constant')
var moment = require('moment')
var fs = require('fs')
const CryptoJS = require('crypto-js');
var FCM = require('fcm-node');
var serverKey = process.env.serverKey
var fcm = new FCM(serverKey);
var sharp = require('sharp')

async function img(profile, profilePath) {
    try {
        var img = (Date.now() + path.extname(profile.name))

        await sharp(profile.tempFilePath)
            .toFormat('png', { palette: true })
            .toFile(profilePath + img)

        var removeTempFile = await removeTmpFile(profile.tempFilePath)
        if (removeTempFile == false) {
            return false;
        }
        return img
    } catch (error) {
        console.log(error);
        return false
    }
}

async function removeTmpFile(tmpPath) {
    var split = tmpPath.split('\\')
    var arrayReverse = split.reverse()[0]
    fs.unlink(`./tmp/${arrayReverse}`, async(err, result) => {
        if (err) {
            return false;
        }
    })
}

/**
 * [CREATED BY : PARTH]
 * VIDEO UPLOAD FUNCTION 
 */
async function post(video, videoPath) {
    try {
        let sampleFile;
        let uploadPath;
        sampleFile = video;
        if (path.extname(sampleFile.name) == '.jpg' || path.extname(sampleFile.name) == '.png' || path.extname(sampleFile.name) == '.jpeg' || path.extname(sampleFile.name) == '.mp4') {
            var img = (Date.now() + path.extname(sampleFile.name))
            uploadPath = videoPath + img;
            sampleFile.mv(uploadPath, function(err) {
                if (err) throw err
            });
            return (img)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

/**
 * [CREATED BY : PARTH]
 * CHECK STRONG PASSWORD VALIDATION FUNCTION
 * @param {STRING} inputtxt     
 * @returns BOOLEAN
 */
async function checkPassword(inputtxt) {
    var passw = constant.kPasswordRegex;
    if (inputtxt.match(passw)) {
        return true;
    } else {
        return false;
    }
}

/**
 * [CREATED BY : PARTH]
 * PHONE NUBER VALIDATION FUNCTION
 * @param {number} phone 
 * @returns BOOLEAN
 */
async function checkPhone(phone) {
    var phoneNo = constant.kPhoneRegex
    if (phone.match(phoneNo)) {
        return true;
    } else {
        return false;
    }
}

/**
 * [CREATED BY : PARTH]
 * CHECK EMAIL VALIDATION FUCNTION 
 * @param {STRING} email 
 * @returns BOOLEAN
 */
async function validateEmail(email) {
    var re = constant.kEmailRegex;
    return re.test(email);
}

/**
 * [CREATED BY : PARTH]
 * Date validation function
 * @param {String} str 
 * @returns Boolean
 */
async function parseDate(str) {
    var m = str.match(constant.kDateRegex);
    return (m) ? true : false;
}

/**
 * [CREATED BY : PARTH]
 * COUNTRY CODE VALIDATION FUNCTION
 */
async function countryCodeValidation(country) {
    var codeRegex = country.match(constant.kCountryCodeRegex)
    return (codeRegex) ? true : false;
}

/**
 * [CREATED BY : PARTH]
 * FIRST NAME VALIDATION FUNCTION
 */
async function nameValidation(fsName) {
    var ValidationFsName = fsName.match(constant.kFirstNameRegex)
    return (ValidationFsName) ? true : false;
}

/**
 * [CREATED BY : PARTH]
 * GET AGE FUNCTION
 * @param {STRING} dateString 
 * @returns NUMBER
 */
async function getAge(dateString) {
    return new Promise(resolve => {

        var Birthday = moment(dateString, 'yyyy-mm-dd')
        var DOB = Birthday.format('yyyy-mm-dd')

        var split = DOB.split('-');

        var year = parseInt(split[0]);
        var month = parseInt(split[2]);
        var day = parseInt(split[1]);
        var today = new Date();
        var age = today.getFullYear() - year;
        if (today.getMonth() + 1 < month || (today.getMonth() + 1 == month && today.getDate() < day) && age != 18) {
            age--;
        }

        return resolve(age)
    });
}

/**
 * [CREATED BY : PARTH]
 * LATITUDE LONGITUDE VALIDATION FUNCTION 
 * @param {STRING} latlong 
 * @returns BOOLEAN
 */
async function latLong(latlong) {
    var kLatLongitude = latlong.match(constant.kLatLongitude)
    return kLatLongitude ? true : false;
}

/**
 * [CREATED BY : PARTH]
 * REMOVE IMAGE (USER)
 * @param {STRING} image 
 */
async function destroyImg(image, destroyPath) {
    var imageFullPathName = path.join(destroyPath, image);
    var dlt = true;
    fs.unlink(imageFullPathName, function(err) {
        if (err) {
            if (err.code != 'ENOENT') {
                dlt = false
            }
        }
    });
    return dlt

}

/**
 * [CREATED BY : PARTH]
 * GENERATE RANDOM STRING
 * @param {STRING} length 
 * @returns STRING
 */
async function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

/**
 * [CREATED BY : PARTH]
 * ENCRYPT DATA FUNCTION
 * @param {STRING} id 
 * @returns STRING
 */
const encryptData = async(id) => {
    return new Promise(resolve => {

        var dataId = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(id), process.env.secretKey).toString());
        return resolve(dataId);
    });
}

/**
 * [CREATED BY : PARTH]
 * DECRYPT DATA FUNCTION
 * @param {STRING} id 
 * @returns STRING
 */
const decryptData = async(id) => {
    return new Promise(resolve => {
        try {
            var data = CryptoJS.AES.decrypt(decodeURIComponent(id), process.env.secretKey).toString(CryptoJS.enc.Utf8);

            if (data.indexOf('"') > -1) {
                dataId = data.substring(1, data.length - 1);
            } else {
                dataId = data;
            }

            return resolve(dataId)
        } catch (e) {
            return resolve('')
        }

    });
}

/**
 * [CREATED BY : NEHA]
 * SEND NOTIFICATION COMMON FUNCTION
 * @param {Object} data 
 */
async function sendNotification(data) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        registration_ids: data.token,

        notification: {
            title: data.title,
            body: data.message
        },

        data: data.data
    };

    fcm.send(message, async function(err, response) {
        if (err) {
            console.log("err : ", err);
        } else {
            console.log("response: ", response);
        }
    });
}

module.exports = {
    img,
    checkPassword,
    checkPhone,
    validateEmail,
    parseDate,
    countryCodeValidation,
    nameValidation,
    getAge,
    latLong,
    destroyImg,
    randomString,
    encryptData,
    decryptData,
    post,
    sendNotification,
    removeTmpFile
}