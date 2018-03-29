import React, { Component } from 'react';
import { Container, Icon, Input, Menu, Divider, Dropdown, List, Segment, Visibility } from 'semantic-ui-react';
import { Link } from '../../routes';
import factory from '../../ethereum/factory'; // import factory instance
import web3 from "../../ethereum/web3";

class Header extends Component {

  state = {
    userAddress: '',
    isUser: false
  };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const isRegistered = await factory.methods.users(accounts[0]).call();

      this.setState({ userAddress: accounts[0] });

      if (isRegistered.role === '1' || isRegistered.role === '2') {
        this.setState({ isUser: true });
      }

    } catch (err) {
      console.log(err);
    }
  };

  handleMenu() {
    if (this.state.isUser === false) {
      return (
        <Link route="/signup">
          <a className="item">Signup</a>
        </Link>
      );
    } else {
      return (
        <Link route={`/users/${this.state.userAddress}`}>
          <a className="item">Profile</a>
        </Link>
      );
    }
  }

  render(){
    const menuStyle = {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: 0,
      boxShadow: 'none',
      marginBottom: '1em',
      marginTop: '4em',
      transition: 'box-shadow 0.5s ease, padding 0.5s ease',
    };

    return (
      <Container style={{ marginBottom: '20px' }}>
        <Menu style={menuStyle}>
          <Link route="/">
            <a className="item">OddUcation</a>
          </Link>

          <Menu.Menu position="middle">
            <Link route="/posts/all-posts">
              <a className="item">
                All Posts
              </a>
            </Link>

            <Link route="/users/all-users">
              <a className="item">
                All Users
              </a>
            </Link>

            <Link route="/users/all-organizations">
              <a className="item">
                All Organizations
              </a>
            </Link>
          </Menu.Menu>

          <Menu.Menu position="right">

            <Link route="/posts/new">
              <a className="item">
                <Icon name="compose" />
              </a>
            </Link>

            {this.handleMenu()}
            
          </Menu.Menu>
        </Menu>
      </Container>
    );
  };

};

export default Header;