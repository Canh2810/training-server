const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Add middleware to serve index.html for non-API routes
const path = require('path');
server.use((req, res, next) => {
  if (req.method === 'GET' && req.headers.accept.indexOf('html') !== -1) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3200;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
