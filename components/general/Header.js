import React, { Component } from 'react';
import { Container, Icon, Input, Menu, Divider, Dropdown, List, Segment, Visibility, Image } from 'semantic-ui-react';
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
      border: 'none',
      borderRadius: 0,
      borderRadius: 0,
      boxShadow: 'none',
      marginBottom: '1em',
      marginTop: '4em',
      transition: 'box-shadow 0.5s ease, padding 0.5s ease',
    };

    const containerStyle = {
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      fontSize: '1rem'
    };

    return (
      <Menu borderless style={menuStyle}>
        <Container text style={containerStyle}>

          <Menu.Item header>
            <Link route="/">
              <a className="item">
                <Icon name='book' size='large' />
                OddUcation
              </a>
            </Link>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Link route="/posts/new">
                <a className="item">
                  <Icon name="compose" size='large' />
                </a>
              </Link>
            </Menu.Item>

            <Dropdown text='More...' className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/posts/all-posts">
                    <a className="item">Posts</a>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                  <Link route="/users/all-users">
                    <a className="item">Users</a>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                  <Link route="/users/all-organizations">
                    <a className="item">Organizations</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              {this.handleMenu()}
            </Menu.Item>
          </Menu.Menu>

        </Container>
      </Menu>
    );
  };

};

export default Header;