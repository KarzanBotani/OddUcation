import React from 'react';
import { Icon, Input, Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '15px' }}>
      <Link route="/">
        <a className="item">OddUcation</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Posts</a>
        </Link>

        <Link route="/posts/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};