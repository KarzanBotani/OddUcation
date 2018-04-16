import React, { Component } from 'react';
import { Button, Form, Input, Message, Icon, Grid } from 'semantic-ui-react';
import Post from '../../ethereum/post';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class Vote extends Component {

  state = {
    errorMessage: '',
    loading: false
  };

  onDownVote = async () => {
    const post = Post(this.props.address);
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await post.methods.vote(0).send({ from: accounts[0] });

      Router.replaceRoute(`/posts/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false })
  }

  onUpVote = async () => {
    const post = Post(this.props.address);
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await post.methods.vote(1).send({ from: accounts[0] });

      Router.replaceRoute(`/posts/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Grid.Column width={3} style={{ padding: "0", textAlign: "right" }}>
        <Button onClick={() => this.onUpVote()} loading={this.state.loading} icon="thumbs up" positive />
        <Button onClick={() => this.onDownVote()} loading={this.state.loading} icon="thumbs down" negative />
      </Grid.Column>
    );
  }

};

export default Vote;