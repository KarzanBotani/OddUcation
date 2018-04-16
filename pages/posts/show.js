import moment from 'moment';
import React, { Component } from "react";
import { Container, Card, Grid, Table, Input, Divider } from "semantic-ui-react";
import Layout from "../../components/general/Layout";
import IncreasePoolForm from "../../components/posts/IncreasePoolForm";
import Vote from "../../components/posts/Vote";
import ViewPost from "../../components/posts/ViewPost";
import factory from "../../ethereum/factory";
import Post from "../../ethereum/post"; // not construct (capital P)
import web3 from "../../ethereum/web3";
import { Link, Router } from '../../routes';

class PostShow extends Component {
  state = {
    ownerName: ''
  };

  static async getInitialProps(props) {
    const post = Post(props.query.address);

    const summary = await post.methods.getPostSummary().call();
    const enumSummary = await post.methods.getPostSummaryEnums().call();
    const n = await factory.methods.getProfile(summary[0]).call();

    let convertedDate = await moment.unix(summary[6]).format('LL');

    return {
      address: props.query.address,
      owner: summary[0],
      ownerName: n[1],
      title: web3.utils.hexToUtf8(summary[1]),
      description: web3.utils.hexToUtf8(summary[2]),
      contentHash: summary[3],
      language: web3.utils.hexToUtf8(summary[4]),
      postBalance: summary[5],
      date: convertedDate,
      length: summary[7],
      views: summary[8],
      viewFee: summary[9],
      upVotes: summary[10],
      downVotes: summary[11],
      paymentOption: enumSummary[0],
      state: enumSummary[1],
      category: enumSummary[2],
      type: enumSummary[3],
      level: enumSummary[4],
      postSummary: summary
    };
  }

  renderTables() {
    const { Body, Cell, Row } = Table;

    const {
      owner,
      ownerName,
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
        <Body>
          <Row>
            <Cell collapsing>Author:</Cell>
            <Cell textAlign="right">
              <Link route={`/users/${owner}`}>
                <a className="item">
                  {web3.utils.hexToUtf8(ownerName)}
                </a>
              </Link>
            </Cell>
          </Row>

          <Row>
            <Cell collapsing>Remaining Pool:</Cell>
            <Cell textAlign="right">{web3.utils.fromWei(postBalance, 'ether')} (ETH)</Cell>
          </Row>

          <Row>
            <Cell collapsing>Uploaded:</Cell>
            <Cell textAlign="right">{date}</Cell>
          </Row>

          <Row>
            <Cell collapsing>Views:</Cell>
            <Cell textAlign="right">{views}</Cell>
          </Row>

          <Row>
            <Cell collapsing>Length:</Cell>
            <Cell textAlign="right">{length}</Cell>
          </Row>

          <Row>
            <Cell collapsing>Level:</Cell>
            <Cell textAlign="right">
              {(() => {
                switch (level) {
                  case "0": return "Introductory";
                  case "1": return "Beginner";
                  case "2": return "Intermediate";
                  case "3": return "Advanced";
                }
              })()}
            </Cell>
          </Row>

          <Row>
            <Cell collapsing>Language:</Cell>
            <Cell textAlign="right">{language}</Cell>
          </Row>

          <Row>
            <Cell collapsing>Category:</Cell>
            <Cell textAlign="right">
              {(() => {
                switch (category) {
                  case "0": return "Programming";
                  case "1": return "Math";
                }
              })()}
            </Cell>
          </Row>

          <Row>
            <Cell collapsing>Upvotes:</Cell>
            <Cell textAlign="right">{upVotes}</Cell>
          </Row>

          <Row>
            <Cell collapsing>Downvotes:</Cell>
            <Cell textAlign="right">{downVotes}</Cell>
          </Row>

          <Row>
            <Cell collapsing>View fee:</Cell>
            <Cell textAlign="right">{viewFee}</Cell>
          </Row>

          <Row>
            <Cell collapsing>State:</Cell>
            <Cell textAlign="right">
              {(() => {
                switch (state) {
                  case "0": return "Draft";
                  case "1": return "Published";
                  case "2": return "Archived";
                }
              })()}
            </Cell>
          </Row>

          <Row>
            <Cell collapsing>Type:</Cell>
            <Cell textAlign="right">
              {(() => {
                switch (type) {
                  case "0": return "Audio";
                  case "1": return "Text";
                  case "2": return "Video";
                }
              })()}
            </Cell>


          </Row>

          <Row>
            <Cell collapsing>Payment Option:</Cell>
            <Cell textAlign="right">
              {(() => {
                switch (paymentOption) {
                  case "0": return "Personal";
                  case "1": return "Organization";
                }
              })()}
            </Cell>
          </Row>
        </Body>
      </Table>
    );

    return tab;
  }

  render() {
    return (
      <Layout>
        <Container>
          <Grid>
            <Grid.Row style={{ marginTop: "4em" }}>
              <ViewPost address={this.props.address} />
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={13}>
                <h2>{this.props.title}</h2>
              </Grid.Column>
              <Vote address={this.props.address} />
            </Grid.Row>

            <Divider style={{ marginLeft: "0", marginRight: "0", backgroundColor: "pink" }} />

            <Grid.Row>
              <Grid.Column width={10} style={{ paddingLeft: "0" }} >
                <Card fluid>
                  <Card.Content header="Description:" />
                  <Card.Content
                    description="Lorem ipsum dolor sit amet, cu harum tollit temporibus nec, no solum melius quaerendum cum. Id soleat postea pro. Accumsan sapientem mei at, ne dicat nonumy sanctus sea. Fuisset atomorum eu qui. Nostro nominavi salutandi ut mei, ludus epicurei evertitur cu cum. Illum scribentur ad sit, ad per facer eligendi. Cum te idque blandit postulant, at minim verterem erroribus nam, choro platonem ius ut. Graeco quaestio ea mei. Nam wisi albucius hendrerit ei, mel cu ferri ignota phaedrum. Eu mei tollit mollis referrentur. Eum id viderer reprimique. Eos ex alia enim omittantur, mazim melius posidonium at nam. Ut his tantas mucius. Ne modo singulis intellegebat his. Ne vis porro adipisci perpetua, vel ludus salutatus cu."
                  />
                </Card>
              </Grid.Column>

              <Grid.Column width={6} style={{ paddingRight: "0" }} >
                {this.renderTables()}
                <IncreasePoolForm address={this.props.address} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default PostShow;