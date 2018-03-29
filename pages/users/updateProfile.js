import React, { Component } from "react";
import { Container, Button, Card, Divider, Grid, Table, Icon, Image, Message, Form, Input } from "semantic-ui-react";
import Layout from "../../components/general/Layout";
import factory from "../../ethereum/factory"; // import factory instance
import Post from "../../ethereum/post"; // not construct (capital P)
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";
import { setTimeout } from "timers";

class UpdateProfile extends Component {
  state = {
    errorMessage: "",
    loading: false,
    userAddress: "",
    balance: "0",
    name: "",
    role: "",
    organizationMembersCount: "0",
    posts: [],
    userPostsCount: "0",
    socialMedia1: "",
    socialMedia2: "",
    socialMedia3: "",
    postSummaries: [],
    newName: '',
    newRole: 1,
    newSocialMedia: '',
    newSocialMediaIndex: 0
  };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const profileSummary = await factory.methods
        .getProfile(accounts[0])
        .call();
      const userPostsCount = await factory.methods
        .userPostsCount(accounts[0])
        .call();

      if (profileSummary[0] === "1") {
        this.setState({ role: "Regular" });
      } else if (profileSummary[0] === "2") {
        this.setState({ role: "Organization" });
        this.setState({ organizationMembersCount: profileSummary[4].length });
      }

      this.setState({ userAddress: accounts[0] });
      this.setState({ balance: balance });
      this.setState({ name: web3.utils.hexToUtf8(profileSummary[1]) });
      this.setState({
        socialMedia1: web3.utils.hexToUtf8(profileSummary[2][0])
      });
      this.setState({
        socialMedia2: web3.utils.hexToUtf8(profileSummary[2][1])
      });
      this.setState({
        socialMedia3: web3.utils.hexToUtf8(profileSummary[2][2])
      });
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
      console.log(err);
    }
  }

  renderEssentials() {
    const { Group, Content, Header, Meta, Description } = Card;
    const {
      name,
      role,
      organizationMembersCount,
      userPostsCount,
      balance,
      socialMedia1,
      socialMedia2,
      socialMedia3
    } = this.state;

    if (role === "Organization") {
      return (
        <Card>
          <Content>
            <Header>
              {name} ({role})
            </Header>
            <Meta>{organizationMembersCount} members</Meta>
            <Meta>{userPostsCount} posts</Meta>
            <Description>
              Balance: {web3.utils.fromWei(balance, "ether")} (ETH)
            </Description>
            <Content extra>{socialMedia1}</Content>
            <Content extra>{socialMedia2}</Content>
            <Content extra>{socialMedia3}</Content>
          </Content>
        </Card>
      );
    } else {
      return (
        <Card fluid>
          <Content>
            <Header>
              {name} ({role})
            </Header>
            <Meta>{userPostsCount} posts</Meta>
            <Description>
              Balance: {web3.utils.fromWei(balance, "ether")} (ETH)
            </Description>
            <Content extra>{socialMedia1}</Content>
            <Content extra>{socialMedia2}</Content>
            <Content extra>{socialMedia3}</Content>
          </Content>
        </Card>
      );
    }
  }

  onDeleteAccount = async event => {
    this.setState({ loading: true, errorMessage: "" });
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      let g = await factory.methods.deleteAccount().send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  onUpdateName = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.setName(web3.utils.utf8ToHex(this.state.newName)).send({ from: accounts[0] });
      
      Router.replaceRoute(`/users/${accounts[0]}/update-profile`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  onUpdateRole = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.setRole(this.state.newRole).send({ from: accounts[0] });
      
      Router.replaceRoute(`/users/${accounts[0]}/update-profile`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  renderUpdateName() {
    return (
      <div style={{ margin: "15px" }}>
        <Form onSubmit={this.onUpdateName} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input
              label="New Name"
              size="mini"
              value={this.state.newName}
              onChange={event =>
                this.setState({ newName: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update Name</Button>
        </Form>
      </div>
    );
  }

  renderUpdateRole() {
    return (
      <div style={{ margin: "15px" }}>
        <Form onSubmit={this.onUpdateRole} error={!!this.state.errorMessage}>
          <Form.Group fluid='true'>
            <Form.Radio
              label="Regular"
              name="newRole"
              checked={this.state.newRole === 1}
              onChange={event => this.setState({ newRole: 1 })}
            />
            <Form.Radio
              label="Organization"
              name="newRole"
              checked={this.state.newRole === 2}
              onChange={event => this.setState({ newRole: 2 })}
            />
          </Form.Group>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update Role</Button>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <Layout>
        <Container>
          <h3>UserProfile</h3>

          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                {this.renderEssentials()}

                <Link route={`/users/${this.state.userAddress}/update-profile`}>
                  <a className="item">
                    <Button
                      fluid
                      content="Update Profile"
                      icon="setting"
                      primary
                    />
                  </a>
                </Link>

                <Link route="/posts/new">
                  <a className="item">
                    <Button
                      fluid
                      content="Create Post"
                      icon="compose"
                      primary
                      style={{ marginTop: "10px" }}
                    />
                  </a>
                </Link>

                <Link route={`/users/${this.state.userAddress}/add-user`}>
                  <a className="item">
                    <Button
                      fluid
                      content="Add User"
                      icon="add user"
                      primary
                      style={{ marginTop: "10px" }}
                    />
                  </a>
                </Link>

                <Link route={`/users/${this.state.userAddress}/show-users`}>
                  <a className="item">
                    <Button
                      fluid
                      content="Show Users"
                      icon="group"
                      primary
                      style={{ marginTop: "10px" }}
                    />
                  </a>
                </Link>

                <Button
                  fluid
                  onClick={event => this.onDeleteAccount(event)}
                  loading={this.state.loading}
                  content="Delete Account"
                  icon="user delete"
                  negative
                  style={{ marginTop: "10px" }}
                />
              </Grid.Column>

              <Grid.Column width={12}>
                {this.renderUpdateName()}
                {this.renderUpdateRole()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default UpdateProfile;
