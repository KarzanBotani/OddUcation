import React, { Component } from "react";
import { Button, Card, Divider, Grid, Table, Icon, Image, Message } from 'semantic-ui-react';
import Layout from "../../components/general/Layout";
import factory from '../../ethereum/factory'; // import factory instance
import Post from "../../ethereum/post"; // not construct (capital P)
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';
import { setTimeout } from "timers";

class UserProfile extends Component {

  state = {
    errorMessage: '',
    loading: false,
    userAddress: '',
    balance: '0',
    name: '',
    role: '',
    organizationMembersCount: '0',
    posts: [],
    userPostsCount: '0',
    socialMedia1: '',
    socialMedia2: '',
    socialMedia3: '',
    postSummaries: []
  }

  async componentDidMount() {

    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const profileSummary = await factory.methods.getProfile(accounts[0]).call();
      const userPostsCount = await factory.methods.userPostsCount(accounts[0]).call();

      if (profileSummary[0] === '1') {
        this.setState({ role: 'Regular'});
      } else if (profileSummary[0] === '2') {
        this.setState({ role: 'Organization' });
        this.setState({ organizationMembersCount: profileSummary[4].length });
      }

      this.setState({ userAddress: accounts[0] });
      this.setState({ balance: balance });
      this.setState({ name: web3.utils.hexToUtf8(profileSummary[1]) });
      this.setState({ socialMedia1: web3.utils.hexToUtf8(profileSummary[2][0]) });
      this.setState({ socialMedia2: web3.utils.hexToUtf8(profileSummary[2][1]) });
      this.setState({ socialMedia3: web3.utils.hexToUtf8(profileSummary[2][2]) });
      this.setState({ posts: profileSummary[3] });
      this.setState({ userPostsCount: userPostsCount });

      let postAddresses = [];
      let allSum = [];

      for (let addr of profileSummary[3]) {
        let p = Post(addr);
        let o = await p.methods.getPostSummary().call();

        postAddresses.push(addr);
        allSum.push(o);
      }

      await this.setState({
        postSummaries: { postAddresses, allSum }
      });
      
    } catch (err) {
      console.log(err)
    }
  };

  renderEssentials() {
    const { Group, Content, Header, Meta, Description } = Card;
    const { name, role, organizationMembersCount, userPostsCount, balance, socialMedia1, socialMedia2, socialMedia3 } = this.state;

    if (role === 'Organization') {
      return (
        <Card>
          <Content>
            <Header>{name} ({role})</Header>
            <Meta>{organizationMembersCount} members</Meta>
            <Meta>{userPostsCount} posts</Meta>
            <Description>Balance: {web3.utils.fromWei(balance, 'ether')} (ETH)</Description>
            <Content extra>{socialMedia1}</Content>
            <Content extra>{socialMedia2}</Content>
            <Content extra>{socialMedia3}</Content>
          </Content>
        </Card>
      );
    }
    
    else {
      return (
        <Card fluid>
          <Content>
            <Header>{name} ({role})</Header>
            <Meta>{userPostsCount} posts</Meta>
            <Description>Balance: {web3.utils.fromWei(balance, 'ether')} (ETH)</Description>
            <Content extra>{socialMedia1}</Content>
            <Content extra>{socialMedia2}</Content>
            <Content extra>{socialMedia3}</Content>
          </Content>
        </Card>
      );
    }
  }

  renderPosts() {
    try {
      const { Group, Content, Header, Meta, Description } = Card;
      const { postSummaries, userPostsCount } = this.state;
      let q = [];

      for (let i = 0; i < userPostsCount; i++) {
        q[i] =
          <Link route={`/posts/${postSummaries.postAddresses[i]}`}>
            <Card style={{ maxWidth: '240px' }}>
              <Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
              <Content>
                <Header>{web3.utils.toAscii(postSummaries.allSum[i][1])}</Header>
                <Meta>
                  <span style={{ float: 'right' }}>{postSummaries.allSum[i][8]} views</span>
                  <span>by {this.state.name}</span>
                </Meta>
                <Content extra>
                  <span style={{ float: 'right' }}>up: {postSummaries.allSum[i][10]} / down: {postSummaries.allSum[i][11]}</span>
                  <span>date: {postSummaries.allSum[i][6]}</span>
                </Content>
              </Content>
            </Card>
          </Link>
        ;
      }

      return <Group>{q}</Group>;
    } catch (err) {
      console.log(err);
    }
  }

  onDeleteAccount = async (event) => {
    this.setState({ loading: true, errorMessage: '' });
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      let g = await factory.methods.deleteAccount().send({ from: accounts[0] });
      
      Router.pushRoute('/');
    } catch (err) {
      console.log('err: ', err);
    }

    this.setState({ loading: false });
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
                  <Button fluid content="Create Post" icon="compose" primary />
                </a>
              </Link>

              <Link route={`/users/${this.state.userAddress}/add-user`}>
                <a className="item">
                  <Button fluid content="Add User" icon="add user" primary style={{ marginTop: '10px' }} />
                </a>
              </Link>

              <Link route={`/users/${this.state.userAddress}/show-users`}>
                <a className="item">
                  <Button fluid content="Show Users" icon="group" primary style={{ marginTop: '10px' }} />
                </a>
              </Link>

              <Button fluid onClick={event => this.onDeleteAccount(event)} loading={this.state.loading}
              content="Delete Account" icon="user delete" negative style={{ marginTop: '10px' }} />
            </Grid.Column>

            <Grid.Column width={12}>
              <h3>My Posts:</h3>
              {this.renderPosts()}
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Layout>
    );
  };

};

export default UserProfile;