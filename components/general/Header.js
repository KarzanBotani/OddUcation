import React, { Component } from 'react';
import { Icon, Input, Menu } from 'semantic-ui-react';
import { Link } from '../../routes';
import factory from '../../ethereum/factory'; // import factory instance
import web3 from "../../ethereum/web3";

class Header extends Component {

  state = {
    userAddress: ''
  };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({ userAddress: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };

  render(){
    return (
      <Menu style={{ marginTop: '15px' }}>
        <Link route="/">
          <a className="item">OddUcation</a>
        </Link>

        <Menu.Menu position="right">
          <Link route="/posts/new">
            <a className="item">
              <Icon name="compose" />
            </a>
          </Link>

          <Link route={`/users/${this.state.userAddress}`}>
            <a className="item">Profile</a>
          </Link>

          <Link route="/signup">
            <a className="item">Signup</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  };

};

export default Header;