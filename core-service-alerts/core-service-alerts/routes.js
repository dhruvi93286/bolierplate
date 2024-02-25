const Alerts = require('./services/alerts/src/router/alerts.router');
const alertsAssign = require('./services/alerts/src/router/alertsAssign.router');

module.exports = function routes(app) {
  app.use('/api/v1/alerts', Alerts);
  app.use('/api/v1/alertsassign', alertsAssign);
};
