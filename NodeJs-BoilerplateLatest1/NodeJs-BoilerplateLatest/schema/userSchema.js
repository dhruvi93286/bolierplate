/**
 * USERS TABLE SCHEMA
 */
module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING(50),
            defaultValue: ""
        },
        lastName: {
            type: Sequelize.STRING(50),
            defaultValue: ""
        },
        username: {
            type: Sequelize.STRING(30),
            defaultValue: ""
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        email: {
            type: Sequelize.STRING(50),
            defaultValue: ""
        },
        profile: {
            type: Sequelize.STRING(50),
            defaultValue: ""
        },
        phone: {
            type: Sequelize.BIGINT(12),

        },
        countryCode: {
            type: Sequelize.INTEGER(2),
        },
        dateOfBirth: {
            type: Sequelize.DATEONLY,
        },
        address: {
            type: Sequelize.STRING(100),
        },
        loginType: {
            type: Sequelize.INTEGER(1),
            comment: "0-(phone, countryCode/email)/password, 1-googleId , 2-facebookId, 3- appleId",
        },
        latitude: {
            type: Sequelize.STRING(50),
        },
        longitude: {
            type: Sequelize.STRING(50),
        },
        isNotification: {
            type: Sequelize.INTEGER(1),
            comment: "0 - on , 1-off",
            defaultValue: 1
        },
        isBlock: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        randomString: {
            type: Sequelize.STRING(100),
            defaultValue: ""
        },
        googleId: {
            type: Sequelize.STRING(30),
        },
        facebookId: {
            type: Sequelize.STRING(30),
        },
        appleId: {
            type: Sequelize.STRING(30),
        },
        language: {
            type: Sequelize.STRING(30),
            defaultValue: "en"
        },
        socketId: {
            type: Sequelize.STRING(50),
            defaultValue: ""
        }
    });
    return users;
};