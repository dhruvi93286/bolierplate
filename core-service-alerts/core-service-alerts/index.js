/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable consistent-return */

const common = require('common-module');;
const app = common.app;
var mongoose = require('./db/index');
const keycloak = require('./config/keycloak-config').initKeycloak();
const logger = require("./Logger");
app.use(keycloak.middleware());
const PORT = process.env.AlERT_PORT || 6001;
const server = common.server;
const jsonData = require('./alerts-data.json');
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
var configData = {
  licenseVersion: process.env.LICENSEVERSION,
  applicationVersion: process.env.APPLICATIONVERSION,
  firstName: process.env.FIRSTNAME,
  lastName: process.env.LASTNAME,
  email: process.env.EMAIL,
  expirationDate: process.env.EXPIRATIONDATE
};
const licenseFileContent = licenseFile.generate({
  privateKeyPath: './private_key.pem',
  template,
  data: configData
});

fs.writeFileSync('./licence.lic', licenseFileContent, 'utf8');

app.get('/', (req, res) => {
  res.send('Server is up!');
});
require('./db');
// const alerts = mongoose.model('Alerts');
// for (let i = 0; i < jsonData.alertsData.length; i++) {
//   if (alerts.findOne(jsonData.alertsData[i], function (err, docs) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       if (docs === null) {
//         {
//           alerts.create(jsonData.alertsData[i]);
//         }
//       }
//     }
//   })) {
//     console.log("Json data created successfully");
//   }
// }
require('./routes')(app);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`.blue);
  logger.info(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;