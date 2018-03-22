import React, { Component } from "react";
import { Button, Card, Divider, Grid, Table } from 'semantic-ui-react';
import Layout from "../../components/general/Layout";
import factory from '../../ethereum/factory'; // import factory instance
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class UserProfile extends Component {

  state = {
    userAddress: '',
    balance: '0',
    name: '',
    role: '',
    organizationMembersCount: '0',
    posts: '',
    userPostsCount: '0',
    socialMedia1: '',
    socialMedia2: '',
    socialMedia3: ''
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
      } else if (profileSummary[0] === '2') {
        this.setState({ role: 'Organization' });
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

    if (this.state.role === 'Organization') {
      return (
        <Card>
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
    
    else {
      return (
        <Card fluid>
          <Content>
            <Header>{this.state.name} ({this.state.role})</Header>
            <Meta>{this.state.userPostsCount} posts</Meta>
            <Description>Balance: {web3.utils.fromWei(this.state.balance, 'ether')} (ETH)</Description>
            <Content extra>{this.state.socialMedia1}</Content>
            <Content extra>{this.state.socialMedia2}</Content>
            <Content extra>{this.state.socialMedia3}</Content>
          </Content>
        </Card>
      );
    }
  }

  render() {
    return (
      <Layout>
        <h3>UserProfile</h3>

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
              <h3>My Posts:</h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  };

};

export default UserProfile;