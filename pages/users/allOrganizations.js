import React, { Component } from 'react';
import { Container, Button, Card, Divider, Grid, Table, Icon, Image, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory'; // import factory instance
import Post from '../../ethereum/post';
import Layout from '../../components/general/Layout';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

// class components allow you to use lifecycle components like: componentDidMount
class AllOrganizations extends Component {

  state = {
    errorMessage: '',
    loading: false,
    userAddresses: [],
    organizationAddresses: [],
    organizationList: [],
    numOrganizations: 0
  };

  async componentDidMount() {
    try {
      let allUserAddresses = await factory.methods.getUsers().call();
      let orgAddresses = [];
      let profiles = [];

      for (let address of allUserAddresses) {
        let req = await factory.methods.getProfile(address).call();

        if (req[0] === '2') {
          orgAddresses.push(address);
          profiles.push(req);
        }
      }

      await this.setState({ organizationAddresses: orgAddresses });
      await this.setState({ organizationList: profiles });
      await this.setState({ numOrganizations: profiles.length });
    } catch (err) {
      console.log(err);
    }
  }

  renderAllOrganizations() {
    try {
      const { Row, Cell } = Table;
      const { organizationAddresses, organizationList, numOrganizations } = this.state;
      let q = [];

      for (let i = 0; i < numOrganizations; i++) {
        q[i] = 
          <Row>

            <Cell>
              {(() => {
                switch (organizationList[i][0]) {
                  case "1": return "Regular";
                  case "2": return "Organization";
                }
              })()}
            </Cell>

            <Cell>
              <Link route={`/users/${organizationAddresses[i]}`}>
                <a className="item">
                  {web3.utils.hexToUtf8(organizationList[i][1])}
                </a>
              </Link>
            </Cell>

            <Cell>
              <Link route={`/users/${organizationAddresses[i]}`}>
                <a className="item">
                  {organizationAddresses[i]}
                </a>
              </Link>
            </Cell>

            <Cell>{organizationList[i][3].length}</Cell>

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
          <h1>All Organizations</h1>

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

                  <Body>{this.renderAllOrganizations()}</Body>
                </Table>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    )
  }

}

// 

export default AllOrganizations;