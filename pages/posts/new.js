// You need 'Component' when it is a class based component
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/general/Layout";
import factory from '../../ethereum/factory'; // import factory instance
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes'; // Link = react component for <a> tags - navigation. Router = redirect from one page to another

class PostNew extends Component {
  
  state = {
    errorMessage: '',
    loading: false,
    title: '',
    description: '',
    contentHash: '',
    language: '',
    date: '',
    length: '',
    viewFee: '',
    viewFeePercentage: '',
    paymentOption: '',
    state: '',
    category: '',
    pType: '',
    level: '',
    postCount: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createPost(
          web3.utils.fromAscii(this.state.title),
          web3.utils.fromAscii(this.state.description),
          web3.utils.fromAscii(this.state.contentHash),
          web3.utils.fromAscii(this.state.language),
          this.state.date,
          this.state.length,
          this.state.viewFee,
          this.state.viewFeePercentage,
          this.state.paymentOption,
          this.state.state,
          this.state.category,
          this.state.pType,
          this.state.level
        )
        .send({ from: accounts[0] });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create A Post</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input label="Title" labelPosition="right" size="mini" value={this.state.title}
              onChange={event => this.setState({ title: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Description" labelPosition="right" size="mini" value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Content Hash" labelPosition="right" size="mini" value={this.state.contentHash}
              onChange={event => this.setState({ contentHash: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Language" labelPosition="right" size="mini" value={this.state.language}
              onChange={event => this.setState({ language: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Date" labelPosition="right" size="mini" value={this.state.date}
              onChange={event => this.setState({ date: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Length" labelPosition="right" size="mini" value={this.state.length}
              onChange={event => this.setState({ length: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="View Fee" labelPosition="right" size="mini" value={this.state.viewFee}
              onChange={event => this.setState({ viewFee: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="View Fee Percentage" labelPosition="right" size="mini" value={this.state.viewFeePercentage}
              onChange={event => this.setState({ viewFeePercentage: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Payment Option" labelPosition="right" size="mini" value={this.state.paymentOption}
              onChange={event => this.setState({ paymentOption: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="State" labelPosition="right" size="mini" value={this.state.state}
              onChange={event => this.setState({ state: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Category" labelPosition="right" size="mini" value={this.state.category}
              onChange={event => this.setState({ category: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Post Type" labelPosition="right" size="mini" value={this.state.pType}
              onChange={event => this.setState({ pType: event.target.value })} style={{ marginTop: '15px' }} />

            <Input label="Level" labelPosition="right" size="mini" value={this.state.level}
              onChange={event => this.setState({ level: event.target.value })} style={{ marginTop: '15px' }} />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  };

};

export default PostNew;
