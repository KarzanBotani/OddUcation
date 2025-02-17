const { createServer } = require('http'),
      next = require('next'),
      app = next({ dev: process.env.NODE_ENV !== 'production' }),
      routes = require('./routes'),
      handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(1991, (err) => {
    if (err) { throw err; }

    console.log('Up and running on port 1991!');
  });
});