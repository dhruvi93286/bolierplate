const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')
const logger = require('../Logger');
const alertsSchema = require('../services/alerts/src/moduler/alerts.moduler');
const alertsAssignSchema = require('../services/alerts/src/moduler/alertsAssign.moduler');
const dbConfig = require("../db/db.config.js");
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/medicaredatabase';
mongoose.set('returnOriginal', false);

alertsSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });
alertsAssignSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

mongoose.model('Alerts', alertsSchema);
mongoose.model('AlertsAssign', alertsAssignSchema);
console.log("DB Connection URl", MONGO_URI)
logger.info(`DB Connection URl ${MONGO_URI}`);

try {
  mongoose.connect(MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true, keepAliveInitialDelay: 300000 });
  console.log("MongoDB connection Successfully");
  logger.info('MongoDB connection Successfully');
} catch (error) {
  console.log("DB Connection Error", error);
  logger.error('DB Connection Error', error);
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'),
  logger.error('MongoDB connection error'));

module.exports = db;