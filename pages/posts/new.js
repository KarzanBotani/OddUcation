import React, { Component } from "react";
import Head from 'next/head';
import { Container, Button, Form, Input, Message, Grid } from "semantic-ui-react";
import Layout from "../../components/general/Layout";
import factory from '../../ethereum/factory'; // import factory instance
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes'; // Link = react component for <a> tags - navigation. Router = redirect from one page to another
import ISO6391 from 'iso-639-1';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class PostNew extends Component {

  async componentDidMount() {
    this.handleChange = this.handleChange.bind(this);
    let all = ISO6391.getAllNames();
    let listy = [];

    for (let i = 0; i < all.length; i++) {
      await listy.push({ value: all[i], text: all[i] });
    }

    await this.setState({ allLanguages: listy });
  }
  
  state = {
    errorMessage: '',
    loading: false,
    title: '',
    description: '',
    contentHash: 'a',
    language: '',
    date: moment().unix(),
    length: '',
    viewFee: '',
    viewFeePercentage: '',
    paymentOption: 0,
    state: 0,
    category: 0,
    pType: 0,
    level: 0,
    postCount: '',
    allLanguages: [],
    startDate: moment()
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

  renderFeeSection() {
    const paymentOptions = [
      { value: 0, text: 'Personal' },
      { value: 1, text: 'Organization' }
    ];

    if (this.state.paymentOption === 0) {
      return (
        <Form.Group widths='equal'>
          <Form.Dropdown fluid selection label='Payment Option' defaultValue={paymentOptions[0].value} options={paymentOptions} onChange={ (event, { value }) => this.setState({ paymentOption: value }) } />
          
          <Form.Field>
            <label>View Fee (wei)</label>
            <Input placeholder='wei' fluid value={this.state.viewFee} onChange={event => this.setState({ viewFee: event.target.value })} />
          </Form.Field>
        </Form.Group>
      )
    } else {
      return (
        <Form.Group widths='equal'>
          <Form.Dropdown fluid selection label='Payment Option' defaultValue={paymentOptions[0].value} options={paymentOptions} onChange={ (event, { value }) => this.setState({ paymentOption: value }) } />

          <Form.Field>
            <label>View Fee (wei)</label>
            <Input placeholder='wei' fluid value={this.state.viewFee} onChange={event => this.setState({ viewFee: event.target.value })} />
          </Form.Field>

          <Form.Field>
            <label>View Fee Percentage (wei)</label>
            <Input placeholder='wei' fluid value={this.state.viewFeePercentage} onChange={event => this.setState({ viewFeePercentage: event.target.value })} />
          </Form.Field>
        </Form.Group>
      )
    }
  }

  async handleChange(date) {
    this.setState({ startDate: date });
    let unixDate = moment().unix(date._d);
    await this.setState({ date: unixDate });
  }

  render() {
    const { Row, Column } = Grid;
    const { Input, TextArea, Group, Field, Dropdown } = Form;

    const postStates = [
      { value: 0, text: 'Draft' },
      { value: 1, text: 'Published' },
      { value: 2, text: 'Archived' }
    ];

    const postCategories = [
      { value: 0, text: 'Programming' },
      { value: 1, text: 'Math' }
    ];

    const postTypes = [
      { value: 0, text: 'Audio' },
      { value: 1, text: 'Text' },
      { value: 2, text: 'Video' }
    ];

    const postLevels = [
      { value: 0, text: 'Introductory' },
      { value: 1, text: 'Beginner' },
      { value: 2, text: 'Intermediate' },
      { value: 3, text: 'Advanced' }
    ];

    return (
      <Layout>
        <Head>
          <link href='/static/datepicker.css' rel='stylesheet' />
        </Head>

        <Container style={{ marginTop: '4em', marginBottom: '8em' }}>
          <Grid centered>
            <Row>
              <Column width={10}>

                <h3>Create Post</h3>
              
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                  <Input label='Title' fluid value={this.state.title} onChange={event => this.setState({ title: event.target.value })} />

                  <TextArea label='Description' value={this.state.description} onChange={event => this.setState({ description: event.target.value })} />

                  <Group widths='equal'>
                  
                    <Dropdown fluid selection label='State' defaultValue={postStates[1].value} options={postStates} onChange={ (event, { value }) => this.setState({ state: value }) } />

                    <Field fluid>
                      <label>Date</label>
                      <DatePicker selected={this.state.startDate} onChange={this.handleChange.bind(this)} />
                    </Field>

                    <Dropdown fluid search selection label='Language' options={this.state.allLanguages} onChange={ (event, { value }) => this.setState({ language: value }) } />
                    
                    <Input label='Length' fluid value={this.state.length} onChange={event => this.setState({ length: event.target.value })} />
                  </Group>

                  {this.renderFeeSection()}

                  <Group widths='equal'>
                    <Dropdown fluid selection label='Category' options={postCategories} onChange={ (event, { value }) => this.setState({ category: value }) } />
                    <Dropdown fluid selection label='Type' options={postTypes} onChange={ (event, { value }) => this.setState({ pType: value }) } />
                    <Dropdown fluid selection label='Level' options={postLevels} onChange={ (event, { value }) => this.setState({ level: value }) } />
                  </Group>

                  <Message error header="Oops!" content={this.state.errorMessage} />
                  <Button loading={this.state.loading} primary>Create</Button>
                </Form>

              </Column>
            </Row>
          </Grid>
        </Container>
      </Layout>
    );
  };

};

export default PostNew;
