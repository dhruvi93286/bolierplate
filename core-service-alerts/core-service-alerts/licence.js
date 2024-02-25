const licenseFile = require('nodejs-license-file');
const fs = require('fs');
const template = [
    '====BEGIN LICENSE====',
    '{{&licenseVersion}}',
    '{{&applicationVersion}}',
    '{{&firstName}}',
    '{{&lastName}}',
    '{{&email}}',
    '{{&expirationDate}}',
    '{{&serial}}',
    '=====END LICENSE====='
].join('\n');

async function licence(configData) {
    try {
        var dateString = configData.expirationDate; // Oct 23
        var dateParts = dateString.split("-");
        var mydate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        const currenctDate = new Date();
        const expiryDate = mydate;
        if (currenctDate <= expiryDate) {
            const data = licenseFile.parse({
                publicKeyPath: './private_key.pem',
                template: template,
                licenseFile: fs.readFileSync('./licence.lic', 'utf8')
            });
            if (data.valid == true) {
                return true
            } else {
                return { code: 400, message: "Configration wrong", error: "Configration data is wrong, Please enter valid configration details" }
            }
        } else {
            return { code: 3418, message: "Licence expire", error: "Licence is expired, Please create new licence" }// 401
        }
    } catch (err) {
        return { code: 400, message: err.message };
    }
}

module.exports = { licence }