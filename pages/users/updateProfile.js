import React, { Component } from "react";
import { Container, Button, Card, Divider, Grid, Table, Icon, Image, Message, Form, Input, Dropdown } from "semantic-ui-react";
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
    newSocialMedia1: '',
    newSocialMedia1Index: 0,
    newSocialMedia2: '',
    newSocialMedia2Index: 1,
    newSocialMedia3: '',
    newSocialMedia3Index: 2,
    pickedOption: 10
  };

  static async getInitialProps(props) {
    const usrAdr = props.query.address;

    return { usrAdr };
  }

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      this.setState({ userAddress: accounts[0] });
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

  onUpdateRole = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.setRole(this.state.newRole).send({ from: accounts[0] });
      
      Router.pushRoute(`/users/${accounts[0]}/update-profile`);
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

  onUpdateSocialMedia1 = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.setSocialMedia(this.state.newSocialMedia1Index , web3.utils.utf8ToHex(this.state.newSocialMedia1)).send({ from: accounts[0] });
      
      Router.replaceRoute(`/users/${accounts[0]}/update-profile`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  onUpdateSocialMedia2 = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.setSocialMedia(this.state.newSocialMedia2Index , web3.utils.utf8ToHex(this.state.newSocialMedia2)).send({ from: accounts[0] });
      
      Router.replaceRoute(`/users/${accounts[0]}/update-profile`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  onUpdateSocialMedia3 = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.setSocialMedia(this.state.newSocialMedia3Index , web3.utils.utf8ToHex(this.state.newSocialMedia3)).send({ from: accounts[0] });
      
      Router.replaceRoute(`/users/${accounts[0]}/update-profile`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  renderUpdateRole() {
    const { Group, Radio } = Form;

    return (
      <div>
        <Form onSubmit={this.onUpdateRole} error={!!this.state.errorMessage}>
          <Group style={{ margin: "8px 0 0 0", float: 'left' }}>
            <Radio
              label="Regular"
              name="newRole"
              checked={this.state.newRole === 1}
              onChange={event => this.setState({ newRole: 1 })}
            />
            <Radio
              label="Organization"
              name="newRole"
              checked={this.state.newRole === 2}
              onChange={event => this.setState({ newRole: 2 })}
            />
          </Group>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update Role</Button>
        </Form>
      </div>
    );
  }

  renderUpdateName() {
    const { Input } = Form;

    return (
      <div>
        <Form onSubmit={this.onUpdateName} error={!!this.state.errorMessage}>
          <Input label="New Name" value={this.state.newName}
            onChange={event => this.setState({ newName: event.target.value }) }
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update Name</Button>
        </Form>
      </div>
    );
  }  

  renderUpdateSocialMedia1() {
    const { Input } = Form;

    return (
      <div>
        <Form onSubmit={this.onUpdateSocialMedia1} error={!!this.state.errorMessage}>
          <Input
            label="New SocialMedia1" value={this.state.newSocialMedia1}
            onChange={event => this.setState({ newSocialMedia1: event.target.value }) }
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update SocialMedia1</Button>
        </Form>
      </div>
    );
  }

  renderUpdateSocialMedia2() {
    const { Input } = Form;

    return (
      <div>
        <Form onSubmit={this.onUpdateSocialMedia2} error={!!this.state.errorMessage}>
          <Input
            label="New SocialMedia2" value={this.state.newSocialMedia2}
            onChange={event => this.setState({ newSocialMedia2: event.target.value }) }
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update SocialMedia2</Button>
        </Form>
      </div>
    );
  }

  renderUpdateSocialMedia3() {
    const { Input } = Form;

    return (
      <div>
        <Form onSubmit={this.onUpdateSocialMedia3} error={!!this.state.errorMessage}>
          <Input
            label="New SocialMedia3" value={this.state.newSocialMedia3}
            onChange={event => this.setState({ newSocialMedia3: event.target.value }) }
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Update SocialMedia3</Button>
        </Form>
      </div>
    );
  }

  renderUpdateOptions() {
    const { pickedOption } = this.state;
    let a;
    
    if (pickedOption === 0) {
      return this.renderUpdateRole();
    } else if (pickedOption === 1) {
      return this.renderUpdateName();
    } else if (pickedOption === 2) {
      return this.renderUpdateSocialMedia1();
    } else if (pickedOption === 3) {
      return this.renderUpdateSocialMedia2();
    } else if (pickedOption === 4) {
      return this.renderUpdateSocialMedia3();
    }
  }

  render() {
    const { Input, TextArea, Group, Field, Dropdown } = Form;

    const updateOptions = [
      { value: 0, text: 'Role' },
      { value: 1, text: 'Name' },
      { value: 2, text: 'Social Media 1' },
      { value: 3, text: 'Social Media 2' },
      { value: 4, text: 'Social Media 3' },
    ];

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
                <label>What would you like to update?</label>
                <Dropdown selection options={updateOptions} onChange={ (event, { value }) => this.setState({ pickedOption: value }) } />

                <Divider style={{ marginLeft: "0", marginRight: "0", backgroundColor: "pink" }} />

                {this.renderUpdateOptions()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default UpdateProfile;
