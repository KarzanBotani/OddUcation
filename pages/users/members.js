import React, { Component } from "react";
import { Button, Card, Form, Grid, Input, Message, Table } from 'semantic-ui-react';
import Layout from "../../components/general/Layout";
import factory from '../../ethereum/factory'; // import factory instance
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';
import profile from "./profile";

class ShowMembers extends Component {

  state = {
    errorMessage: '',
    loading: false,
    userAddress: '',
    balance: '0',
    name: '',
    role: '',
    organizationMembersCount: '0',
    organizationMembers: '',
    posts: '',
    userPostsCount: '0',
    socialMedia1: '',
    socialMedia2: '',
    socialMedia3: '',
    addressToAdd: ''
  }

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const profileSummary = await factory.methods.getProfile(accounts[0]).call();
      const userPostsCount = await factory.methods.userPostsCount(accounts[0]).call();

      this.setState({ userAddress: accounts[0] });
      this.setState({ balance: balance });

      if (profileSummary[0] === '1') {
        this.setState({ role: 'Regular'});
      }
      
      else if (profileSummary[0] === '2') {
        this.setState({ role: 'Organization' });
        this.setState({ organizationMembers: profileSummary[4] });
        console.log(this.state.organizationMembers);
        console.log(typeof this.state.organizationMembers);
        this.setState({ organizationMembersCount: profileSummary[4].length });
      }

      this.setState({ name: web3.utils.hexToUtf8(profileSummary[1]) });
      this.setState({ socialMedia1: web3.utils.hexToUtf8(profileSummary[2][0]) });
      this.setState({ socialMedia2: web3.utils.hexToUtf8(profileSummary[2][1]) });
      this.setState({ socialMedia3: web3.utils.hexToUtf8(profileSummary[2][2]) });
      this.setState({ posts: profileSummary[3] });
      this.setState({ userPostsCount: userPostsCount });
    } catch (err) {
      console.log(err)
    }
  };

  renderEssentials() {
    const { Content, Header, Meta, Description } = Card;

    return (
      <Card fluid>
        <Content>
          <Header>{this.state.name} ({this.state.role})</Header>
          <Meta>{this.state.organizationMembersCount} members</Meta>
          <Meta>{this.state.userPostsCount} posts</Meta>
          <Description>Balance: {web3.utils.fromWei(this.state.balance, 'ether')} (ETH)</Description>
          <Content extra>{this.state.socialMedia1}</Content>
          <Content extra>{this.state.socialMedia2}</Content>
          <Content extra>{this.state.socialMedia3}</Content>
        </Content>
      </Card>
    );
  }

  renderMembers() {
    const { Header, Row, HeaderCell, Body, Cell } = Table;

    
    for (let value in this.state.organizationMembers) {
      console.log(value);
    }

    // return this.state.organizationMembers.map((mem, index) => {
    //   return (
    //     <Row>
    //       <Cell>index {index}</Cell>
    //       <Cell>mem {mem}</Cell>
    //     </Row>
    //   );
    // });

    // for (let value of this.state.organizationMembers) {
    //   return (
    //     <Row>
    //       <Cell>{value}</Cell>
    //     </Row>
    //   );
    // }
  }

  render() {
    const { Header, Row, HeaderCell, Body, Cell } = Table;

    return (
      <Layout>

        <Link route={`/users/${this.state.userAddress}`}>
          <a className="item">Back</a>
        </Link>

        <h3>ShowUsers</h3>

        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              {this.renderEssentials()}

              <Link route="/posts/new">
                <a className="item">
                  <Button fluid content="Create Post" icon="add circle" primary />
                </a>
              </Link>

              <Link route={`/users/${this.state.userAddress}/add-user`}>
                <a className="item">
                  <Button fluid content="Add User" icon="add circle" primary style={{ marginTop: '10px' }} />
                </a>
              </Link>

              <Link route={`/users/${this.state.userAddress}/show-users`}>
                <a className="item">
                  <Button fluid content="Show Users" icon="add circle" primary style={{ marginTop: '10px' }} />
                </a>
              </Link>
              
            </Grid.Column>

            <Grid.Column width={12}>

              <Table>
                <Header>
                  <Row>
                    <HeaderCell>User Address</HeaderCell>
                  </Row>
                </Header>

                <Body>{this.renderMembers()}</Body>
              </Table>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  };

}

export default ShowMembers;