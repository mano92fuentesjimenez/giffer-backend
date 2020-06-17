const createApp = require('./createApp');
const config = require('config');
const logger = require('./getLogger');

const app = createApp();
const port = config.get('app.port');

app.listen(port);

logger.log(`Listening on port ${port}`);
