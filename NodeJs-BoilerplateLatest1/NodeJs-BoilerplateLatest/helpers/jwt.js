const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode")
const db = require("../schema/db");
const users = db.users;
const admins = db.admin;

/**
 * VERIFY USERAUTHENTICATION TOKEN FUNCTION
 */
const verifyTokenUser = async(req, res, next) => {
    const bearerToken =
        req.body.bearerToken || req.query.bearerToken || req.headers["authorization"];
    if (!bearerToken) {
        return res.status(400).send("Unauthorized");
    }
    try {
        var token = bearerToken.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.secretKey, async function(err, decoded) {
            if (err) {
                return res.status(400).send("Unauthorized");
            } else {
                var decoded = jwtDecode(token);
                var userExist = await users.findOne({ where: { id: decoded.userId } });
                if (userExist == null) {
                    return res.status(400).send("Unauthorized");
                } else {
                    return next();

                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};

/**
 * VERIFY ADMIN AUTHENTICATION TOKEN FUNCTION
 */
const verifyTokenAdmin = async(req, res, next) => {
    const bearerToken =
        req.body.bearerToken || req.query.bearerToken || req.headers["authorization"];
    if (!bearerToken) {
        return res.status(400).send("Unauthorized");
    }
    try {
        var token = bearerToken.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.secretKey, async function(err, decoded) {
            if (err) {
                return res.status(400).send("Unauthorized");
            } else {
                var decoded = jwtDecode(token);
                var adminExist = await admins.findOne({ where: { id: decoded.adminId } });
                if (adminExist == null) {
                    return res.status(400).send("Unauthorized");
                } else {
                    return next();
                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};

/**
 * VERIFY BOTH (USER, ADMIN) AUTHENTICTION TOKEN FUNCTION
 */
const verifyToken = async(req, res, next) => {
    const bearerToken =
        req.body.bearerToken || req.query.bearerToken || req.headers["authorization"];
    if (!bearerToken) {
        return res.status(400).send("Unauthorized");
    }
    try {
        var token = bearerToken.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.secretKey, async function(err, decoded) {
            if (err) {
                return res.status(400).send("Unauthorized");
            } else {
                var decoded = jwtDecode(token);
                if (decoded.userId != '' && typeof decoded.userId != 'undefined')
                    var userExist = await users.findOne({ where: { id: decoded.userId } });
                if (decoded.adminId != '' && typeof decoded.adminId != 'undefined')
                    var adminExist = await admins.findOne({ where: { id: decoded.adminId } });
                if (userExist != null || adminExist != null) {
                    return next();
                } else {
                    return res.status(400).send("Unauthorized");
                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};


module.exports = {
    verifyTokenUser,
    verifyTokenAdmin,
    verifyToken
};