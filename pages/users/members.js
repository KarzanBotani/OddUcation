import React, { Component } from "react";
import { Button, Card, Form, Grid, Input, Message, Table, Icon } from 'semantic-ui-react';
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
    organizationMembers: [],
    posts: [],
    userPostsCount: '0',
    socialMedia1: '',
    socialMedia2: '',
    socialMedia3: '',
    addressToAdd: '',
    addressToRemove: '',
    memberInfo: [],
    memberIdsLength: ''
  }

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const profileSummary = await factory.methods.getProfile(accounts[0]).call();
      const userPostsCount = await factory.methods.userPostsCount(accounts[0]).call();

      if (profileSummary[0] === '1') {
        this.setState({ role: 'Regular'});
      }
      
      else if (profileSummary[0] === '2') {
        this.setState({ role: 'Organization' });
        this.setState({ organizationMembers: profileSummary[4] });
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

      let memberIds = [];      
      let memberProfiles = [];

      for (let member of this.state.organizationMembers) {
        let g = await factory.methods.getProfile(member).call();
        memberIds.push(member);
        memberProfiles.push(g);
      }

      await this.setState({
        memberInfo: { memberIds, memberProfiles }
      });

      await this.setState({ memberIdsLength: memberIds.length });
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

  onDeleteAccount = async (event) => {
    this.setState({ loading: true, errorMessage: '' });
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      let g = await factory.methods.deleteAccount().send({ from: accounts[0] });

      console.log('g: ', g);

      Router.pushRoute('/');
    } catch (err) {
      console.log('err: ', err);
    }

    this.setState({ loading: false });
  }

  onRemoveMember = async (member) => {
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.removeMember(member).send({ from: accounts[0] });

      Router.pushRoute(`/users/${this.state.userAddress}/add-user`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log(err.message);
    }

    this.setState({ loading: false });
  }

  renderMembers() {
    const { Row, Cell } = Table;
    const { memberInfo, memberIdsLength } = this.state;
    let x = [];

    for (let i = 0; i < memberIdsLength; i++) {
      x[i] =
        <Row>
          <Cell>
            <Link route={`/users/${memberInfo.memberIds[i]}`}>
              <a className="item">
                {web3.utils.toAscii(memberInfo.memberProfiles[i][1])}
              </a>
            </Link>
          </Cell>

          <Cell>
            <Link route={`/users/${memberInfo.memberIds[i]}`}>
              <a className="item">
                {memberInfo.memberIds[i]}
              </a>
            </Link>
          </Cell>

          <Cell>{memberInfo.memberProfiles[i][3].length}</Cell>
          <Cell textAlign='center'>
            <Button onClick={() => this.onRemoveMember(member)} loading={this.state.loading}
              icon="remove user" negative />
          </Cell>
        </Row>
      ;
    }

    return x;
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

              <Table celled striped>
                <Header>
                  <Row>
                    <HeaderCell>Address</HeaderCell>
                    <HeaderCell>Name</HeaderCell>
                    <HeaderCell colSpan='2'>Posts Count</HeaderCell>
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