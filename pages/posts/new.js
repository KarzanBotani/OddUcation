// You need 'Component' when it is a class based component
import React, { Component } from "react";
import { Container, Button, Form, Input, Message } from "semantic-ui-react";
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
    paymentOption: '0',
    state: '0',
    category: '0',
    pType: '0',
    level: '0',
    postCount: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      let a = await factory.methods
        .createPost(
          web3.utils.utf8ToHex(this.state.title),
          web3.utils.utf8ToHex(this.state.description),
          web3.utils.utf8ToHex(this.state.contentHash),
          web3.utils.utf8ToHex(this.state.language),
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
        <Container>
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

              <Form.Group inline>
                <label>Payment Option: </label>

                <Form.Radio
                  label="Personal"
                  name="paymentOption"
                  checked={this.state.paymentOption === 0}
                  onChange={event => this.setState({ paymentOption: 0 })}
                />
                <Form.Radio
                  label="Organization"
                  name="paymentOption"
                  checked={this.state.paymentOption === 1}
                  onChange={event => this.setState({ paymentOption: 1 })}
                />
              </Form.Group>

              <Form.Group inline>
                <label>State: </label>

                <Form.Radio
                  label="Draft"
                  name="state"
                  checked={this.state.state === 0}
                  onChange={event => this.setState({ state: 0 })}
                />

                <Form.Radio
                  label="Published"
                  name="state"
                  checked={this.state.state === 1}
                  onChange={event => this.setState({ state: 1 })}
                />

                <Form.Radio
                  label="Archived"
                  name="state"
                  checked={this.state.state === 2}
                  onChange={event => this.setState({ state: 2 })}
                />
              </Form.Group>

              <Form.Group inline>
                <label>Category: </label>

                <Form.Radio
                  label="Programming"
                  name="category"
                  checked={this.state.category === 0}
                  onChange={event => this.setState({ category: 0 })}
                />
                <Form.Radio
                  label="Math"
                  name="category"
                  checked={this.state.category === 1}
                  onChange={event => this.setState({ category: 1 })}
                />
              </Form.Group>

              <Form.Group inline>
                <label>Post Type: </label>

                <Form.Radio
                  label="Audio"
                  name="pType"
                  checked={this.state.pType === 0}
                  onChange={event => this.setState({ pType: 0 })}
                />

                <Form.Radio
                  label="Text"
                  name="pType"
                  checked={this.state.pType === 1}
                  onChange={event => this.setState({ pType: 1 })}
                />

                <Form.Radio
                  label="Video"
                  name="pType"
                  checked={this.state.pType === 2}
                  onChange={event => this.setState({ pType: 2 })}
                />
              </Form.Group>

              <Form.Group inline>
                <label>Post Type: </label>

                <Form.Radio
                  label="Introductory"
                  name="level"
                  checked={this.state.level === 0}
                  onChange={event => this.setState({ level: 0 })}
                />

                <Form.Radio
                  label="Beginner"
                  name="level"
                  checked={this.state.level === 1}
                  onChange={event => this.setState({ level: 1 })}
                />

                <Form.Radio
                  label="Intermediate"
                  name="level"
                  checked={this.state.level === 2}
                  onChange={event => this.setState({ level: 2 })}
                />

                <Form.Radio
                  label="Advanced"
                  name="level"
                  checked={this.state.level === 3}
                  onChange={event => this.setState({ level: 3 })}
                />
              </Form.Group>

            </Form.Field>

            <Message error header="Oops!" content={this.state.errorMessage} />

            <Button loading={this.state.loading} primary>Create</Button>
          </Form>
        </Container>
      </Layout>
    );
  };

};

export default PostNew;
