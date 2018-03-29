import React, { Component } from "react";
import { Container, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
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
        <Container className='login-form'>

          <style>{`
            #__next-error { display: none; }
            body { overflow: hidden; }
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>

          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>Signup</Header>

              <Form size='large' onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Segment stacked>

                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Name'
                    value={this.state.accountName}
                    onChange={event => this.setState({ accountName: event.target.value }) }
                  />

                  <Form.Group fluid='true'>
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
                  <Button color='teal' fluid size='large' loading={this.state.loading}>Signup</Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default Signup;
