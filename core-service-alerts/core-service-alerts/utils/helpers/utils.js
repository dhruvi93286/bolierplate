const common = require('common-module');;
const key = 'YWRtaW46cGFzc3dvcmQ=';
const algorithm = 'aes-256-ctr';

//encrypt 
const encrypt = (text) => {
    const cipher = common.crypto.createCipher(algorithm, key);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

//decrypt
const decrypt = (text) => {
    const decipher = common.crypto.createDecipher(algorithm, key);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};


module.exports = {
    encrypt,
    decrypt,
};
