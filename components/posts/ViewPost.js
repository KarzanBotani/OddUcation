import React, { Component } from "react";
import { Button, Form, Input, Message, Icon, Grid } from "semantic-ui-react";
import Post from "../../ethereum/post";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class ViewPost extends Component {
  state = {
    errorMessage: "",
    loading: false
  };

  onViewPost = async () => {
    const post = Post(this.props.address);
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await post.methods.viewPost().send({ from: accounts[0] });

      Router.replaceRoute(`/posts/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Grid.Column width={16} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "0px" }}>
        <video
          onPlay={() => this.onViewPost()}
          loading={this.state.loading}
          style={{ width: "100%" }}
          controls
          src={
            "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-eek.mp4"
          }
        />
      </Grid.Column>
    );
  }
}

export default ViewPost;
