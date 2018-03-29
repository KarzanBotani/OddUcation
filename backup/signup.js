import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/general/Layout";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Link, Router } from "../routes";

class Signup extends Component {
  state = {
    errorMessage: "",
    loading: false,
    userAddress: '',
    accountType: 1,
    accountName: ""
  };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({ userAddress: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.signup(this.state.accountType, web3.utils.utf8ToHex(this.state.accountName))
        .send({ from: accounts[0] });

      Router.pushRoute(`/users/${this.state.userAddress}`)
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>signup</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Input
            fluid
            label="Name"
            value={this.state.accountName}
            onChange={event => this.setState({ accountName: event.target.value }) }
          />

          <Form.Group inline>
            <Form.Radio
              label="Regular"
              name="accountType"
              checked={this.state.accountType === 1}
              onChange={event => this.setState({ accountType: 1 })}
            />
            <Form.Radio
              label="Organization"
              name="accountType"
              checked={this.state.accountType === 2}
              onChange={event => this.setState( {accountType: 2 })}
            />
          </Form.Group>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Signup</Button>
        </Form>
      </Layout>
    );
  }
}

export default Signup;
