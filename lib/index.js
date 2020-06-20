const createApp = require('./createApp');
const config = require('config');
const logger = require('./getLogger');
const log404 = require('../middlewares/log404');

const app = createApp();

const port = config.get('app.port');

app.listen(port);
// app.use(log404);

logger.log(`Listening on port ${port}`);
