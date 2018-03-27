import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Post from '../../ethereum/post';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class IncreasePoolForm extends Component {

  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onIncreasePool = async (event) => {
    event.preventDefault();

    const post = Post(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      
      await post.methods.increasePool().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/posts/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  }

  render() {
    return (
      <Form onSubmit={this.onIncreasePool} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>Increase Pool</Button>
      </Form>
    );
  }

}

export default IncreasePoolForm;