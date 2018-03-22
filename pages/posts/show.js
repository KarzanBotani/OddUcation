import React, { Component } from "react";
import { Card, Grid, Table } from "semantic-ui-react";
import Layout from "../../components/general/Layout";
import Post from "../../ethereum/post"; // not construct (capital P)
import web3 from "../../ethereum/web3";

class PostShow extends Component {
  static async getInitialProps(props) {
    const post = Post(props.query.address);

    const summary = await post.methods.getPostSummary().call();
    const enumSummary = await post.methods.getPostSummaryEnums().call();

    return {
      owner: summary[0],
      title: web3.utils.toAscii(summary[1]),
      description: web3.utils.toAscii(summary[2]),
      contentHash: summary[3],
      language: web3.utils.toAscii(summary[4]),
      postBalance: summary[5],
      date: summary[6],
      length: summary[7],
      views: summary[8],
      viewFee: summary[9],
      upVotes: summary[10],
      downVotes: summary[11],
      paymentOption: enumSummary[0],
      state: enumSummary[1],
      category: enumSummary[2],
      type: enumSummary[3],
      level: enumSummary[4]
    };
  }

  renderTables() {
    const {
      owner,
      title,
      description,
      contentHash,
      language,
      postBalance,
      date,
      length,
      views,
      viewFee,
      upVotes,
      downVotes,
      paymentOption,
      state,
      category,
      type,
      level
    } = this.props;

    const tab = (
      <Table celled striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>Author:</Table.Cell>
            <Table.Cell textAlign="right" style={{ fontSize: '10px' }}>{owner}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Remaining Pool:</Table.Cell>
            <Table.Cell textAlign="right">{postBalance}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Uploaded:</Table.Cell>
            <Table.Cell textAlign="right">{date}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Views:</Table.Cell>
            <Table.Cell textAlign="right">{views}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Length:</Table.Cell>
            <Table.Cell textAlign="right">{length}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Level:</Table.Cell>
            <Table.Cell textAlign="right">{level}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Language:</Table.Cell>
            <Table.Cell textAlign="right">{language}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Category:</Table.Cell>
            <Table.Cell textAlign="right">{category}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Upvotes:</Table.Cell>
            <Table.Cell textAlign="right">{upVotes}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Downvotes:</Table.Cell>
            <Table.Cell textAlign="right">{downVotes}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>View fee:</Table.Cell>
            <Table.Cell textAlign="right">{viewFee}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>State:</Table.Cell>
            <Table.Cell textAlign="right">{state}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Type:</Table.Cell>
            <Table.Cell textAlign="right">{type}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Payment Option:</Table.Cell>
            <Table.Cell textAlign="right">{paymentOption}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    return tab;
  }

  render() {
    return (
      <Layout>
        <h3>{this.props.title}</h3>

        <Grid>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content header="Description:" />
              <Card.Content
                description="Lorem ipsum dolor sit amet, cu harum tollit temporibus nec, no solum melius quaerendum cum. Id soleat postea pro. Accumsan sapientem mei at, ne dicat nonumy sanctus sea. Fuisset atomorum eu qui. Nostro nominavi salutandi ut mei, ludus epicurei evertitur cu cum. Illum scribentur ad sit, ad per facer eligendi. Cum te idque blandit postulant, at minim verterem erroribus nam, choro platonem ius ut. Graeco quaestio ea mei. Nam wisi albucius hendrerit ei, mel cu ferri ignota phaedrum. Eu mei tollit mollis referrentur. Eum id viderer reprimique. Eos ex alia enim omittantur, mazim melius posidonium at nam. Ut his tantas mucius. Ne modo singulis intellegebat his. Ne vis porro adipisci perpetua, vel ludus salutatus cu."
              />
            </Card>
          </Grid.Column>

          <Grid.Column width={6}>{this.renderTables()}</Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default PostShow;
