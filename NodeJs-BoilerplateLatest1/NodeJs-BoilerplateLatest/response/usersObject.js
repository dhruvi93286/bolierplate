var fs = require('fs')
var helpers = require('../helpers/helpers')
    // var check = require('../public/upload/profile')
    /**
     * USER RESPONSE FUNCTION
     * @param {Object} data 
     * @param {String} token 
     * @returns Object
     */
async function usersObjectRes(data, token) {
    var encryptFunc = await helpers.encryptData(data.id)
    var path = `./public/upload/profile/${data.profile}`
    var checkImg = fs.existsSync(path)

    userData = {
        token: token,
        firstName: data.firstName,
        lastName: data.lastName,
        id: encryptFunc,
        username: data.username,
        email: data.email,
        phone: data.phone ? data.phone + '' : '',
        countryCode: data.countryCode ? data.countryCode + '' : '',
        dateOfBirth: data.dateOfBirth != "0000-00-00" ? data.dateOfBirth : "",
        address: data.address,
        loginType: parseInt(data.loginType),
        latitude: data.latitude,
        longitude: data.longitude,
        isNotification: data.isNotification,
        isBlock: data.isBlock,
        googleId: data.googleId,
        facebookId: data.facebookId,
        appleId: data.appleId,
        socketId: data.socketId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }

    if (data.profile != "") {
        userData.profile = process.env.imagePathUser + data.profile
    } else {
        userData.profile = data.profile
    }
    if (checkImg == false) {
        userData.profile = ""
    }
    return (userData)
}

module.exports = {
    usersObjectRes
}