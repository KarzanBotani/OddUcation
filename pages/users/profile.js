import moment from 'moment';
import React, { Component } from "react";
import { Container, Button, Card, Divider, Grid, Table, Icon, Image, Message } from 'semantic-ui-react';
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
    postSummaries: []
  }

  static async getInitialProps(props) {
    try {
      const userAddress = props.query.address;
      const profileSummary = await factory.methods.getProfile(userAddress).call();
      const userPostsCount = await factory.methods.userPostsCount(userAddress).call();
      const balance = await web3.eth.getBalance(userAddress);

      const name = web3.utils.hexToUtf8(profileSummary[1]);
      const socialMedia1 = web3.utils.hexToUtf8(profileSummary[2][0]);
      const socialMedia2 = web3.utils.hexToUtf8(profileSummary[2][1]);
      const socialMedia3 = web3.utils.hexToUtf8(profileSummary[2][2]);
      let posts = [];
      posts = profileSummary[3];

      let role;
      let organizationMembersCount;

      if (profileSummary[0] === '1') {
        role = 'Regular';
      } else if (profileSummary[0] === '2') {
        role = 'Organization';
        organizationMembersCount = profileSummary[4].length;
      }

      return {
        userAddress,
        profileSummary,
        balance,
        userPostsCount,
        name,
        socialMedia1,
        socialMedia2,
        socialMedia3,
        posts,
        role,
        organizationMembersCount,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    try {
      let postAddresses = [];
      let allSum = [];

      for (let addr of this.props.posts) {
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
    const { name, role, organizationMembersCount, userPostsCount, balance, socialMedia1, socialMedia2, socialMedia3 } = this.props;

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
      const { postSummaries } = this.state;
      const { userPostsCount } = this.props;
      let q = [];

      for (let i = 0; i < userPostsCount; i++) {
        q[i] =
          <Link route={`/posts/${postSummaries.postAddresses[i]}`}>
            <Card style={{ maxWidth: '240px' }}>
              <Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
              <Content>
                <Header>{web3.utils.hexToUtf8(postSummaries.allSum[i][1])}</Header>
                <Meta>
                  <span>by {this.props.name}</span>
                </Meta>
                <Content extra>
                  <span>{postSummaries.allSum[i][8]} views</span>
                  <span style={{ marginLeft: '5px', marginRight: '5px' }}>•</span>
                  <span style={{ display: 'inline-block' }}>{moment.unix(postSummaries.allSum[i][6]).fromNow()}</span>
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
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Container style={{ marginBottom: '8em' }}>
          <h3>UserProfile</h3>

          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                {this.renderEssentials()}

                <Link route={`/users/${this.props.userAddress}/update-profile`}>
                  <a className="item">
                    <Button fluid content="Update Profile" icon="setting" primary />
                  </a>
                </Link>

                <Link route="/posts/new">
                  <a className="item">
                    <Button fluid content="Create Post" icon="compose" primary style={{ marginTop: '10px' }} />
                  </a>
                </Link>

                <Link route={`/users/${this.props.userAddress}/add-user`}>
                  <a className="item">
                    <Button fluid content="Add User" icon="add user" primary style={{ marginTop: '10px' }} />
                  </a>
                </Link>

                <Link route={`/users/${this.props.userAddress}/show-users`}>
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
        </Container>
      </Layout>
    );
  };

};

export default UserProfile;