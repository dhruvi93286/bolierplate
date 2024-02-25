const common = require('common-module');;
const {
    createLogger,
    format,
    transports
} = common.winston;
common.winstonMongodb;

function unixTimestamp() {
    return Math.floor(+new Date() / 1000)
}
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/medicaredatabase';
const opts = {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};
const logger = createLogger({
    transports: [
        new (transports.MongoDB)({
            db: MONGO_URI,
            label: 'Alerts',
            collection: 'serverlogs',
            options: { useUnifiedTopology: true },
            capped: true,
            format: format.combine(
                format.timestamp({ format: unixTimestamp }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        })
    ]
});

module.exports = logger;
