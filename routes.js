const routes = require('next-routes')(); // ()() = require statement returns a function. invoked immediately.

// first argument = pattern you want to look for. wildcard = :
// second argument = what component do we want to show
routes
  .add('/users/:address', '/users/profile')
  .add('/users/:address/add-user', '/users/add')
  .add('/users/:address/show-users', '/users/members')
  .add('/posts/new', '/posts/new') // this line is needed because the '/posts/show' line on line 7 is a wildcard that ruins the path
  .add('/posts/:address', '/posts/show');

module.exports = routes;