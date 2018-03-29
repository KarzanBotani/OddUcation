import React, { Component } from 'react';
import { Container, Button, Card, Divider, Grid, Table, Icon, Image, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory'; // import factory instance
import Post from '../../ethereum/post';
import Layout from '../../components/general/Layout';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

// class components allow you to use lifecycle components like: componentDidMount
class AllUsers extends Component {

  state = {
    errorMessage: '',
    loading: false,
    userAddresses: [],
    usersList: [],
    numUsers: 0
  };

  async componentDidMount() {
    try {
      let allUserAddresses = await factory.methods.getUsers().call();
      let profiles = [];

      for (let address of allUserAddresses) {
        let req = await factory.methods.getProfile(address).call();
        profiles.push(req);
      }

      await this.setState({ userAddresses: allUserAddresses });
      await this.setState({ usersList: profiles });
      await this.setState({ numUsers: profiles.length });
    } catch (err) {
      console.log(err);
    }
  }

  renderAllUsers() {
    try {
      const { Row, Cell } = Table;
      const { userAddresses, usersList, numUsers } = this.state;
      let q = [];

      for (let i = 0; i < numUsers; i++) {
        q[i] = 
          <Row>

            <Cell>
              {(() => {
                switch (usersList[i][0]) {
                  case "1": return "Regular";
                  case "2": return "Organization";
                }
              })()}
            </Cell>

            <Cell>
              <Link route={`/users/${userAddresses[i]}`}>
                <a className="item">
                  {web3.utils.hexToUtf8(usersList[i][1])}
                </a>
              </Link>
            </Cell>

            <Cell>
              <Link route={`/users/${userAddresses[i]}`}>
                <a className="item">
                  {userAddresses[i]}
                </a>
              </Link>
            </Cell>

            <Cell>
              {usersList[i][3].length}
            </Cell>

          </Row>
        ;
      }
      
      return q;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { Header, Row, HeaderCell, Body, Cell } = Table;

    return (
      <Layout>
        <Container>
          <h1>All Users</h1>

          <Grid>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>

                <Table celled striped>
                  <Header>
                    <Row>
                      <HeaderCell>Type</HeaderCell>                  
                      <HeaderCell>Name</HeaderCell>
                      <HeaderCell>Address</HeaderCell>
                      <HeaderCell colSpan='2'>Posts Count</HeaderCell>
                    </Row>
                  </Header>

                  <Body>{this.renderAllUsers()}</Body>
                </Table>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    )
  }

}

export default AllUsers;