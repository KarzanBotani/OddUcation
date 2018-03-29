const routes = require('next-routes')(); // ()() = require statement returns a function. invoked immediately.

// first argument = pattern you want to look for. wildcard = :
// second argument = what component do we want to show
routes
  .add('/users/all-users', '/users/allUsers')
  .add('/users/all-organizations', '/users/allOrganizations')
  .add('/users/:address', '/users/profile')
  .add('/users/:address/update-profile', '/users/updateProfile')
  .add('/users/:address/add-user', '/users/add')
  .add('/users/:address/show-users', '/users/members')
  .add('/organizations', '/users/organization/organizations')
  .add('/posts/new', '/posts/new') // this line is needed because the '/posts/show' line on line 7 is a wildcard that ruins the path
  .add('/posts/all-posts', '/posts/allPosts')
  .add('/posts/:address', '/posts/show');

module.exports = routes;