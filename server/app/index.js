const config = require('config');
const app = require('./app');
const socket = require('./socket');

const attachedCallback = (err) => {
  if (err) console.error(err);

  console.log(`Boosteroid-server is running on port ${ port }`);
};

const port = config.get('port');
const server = app.listen(port, attachedCallback);

socket(server);
