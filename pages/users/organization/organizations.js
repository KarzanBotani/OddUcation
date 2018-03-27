import React, { Component } from "react";
import { Button, Card, Form, Grid, Input, Message, Table, Icon } from 'semantic-ui-react';
import Layout from "../../../components/general/Layout";
import factory from '../../../ethereum/factory'; // import factory instance
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class AllOrganizations extends Component {

  state = {
    allOrganizations: []
  };

  async componentDidMount() {
    let x = await factory.methods.usersArray(1).call();

    console.log(x);
  }

  render() {
    return (
      <Layout>
        <h1>hi!</h1>
      </Layout>
    )
  }

}

export default AllOrganizations;