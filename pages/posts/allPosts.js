import moment from 'moment';
import React, { Component } from 'react';
import { Container, Button, Card, Divider, Grid, Table, Icon, Image, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory'; // import factory instance
import Post from '../../ethereum/post';
import Layout from '../../components/general/Layout';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

// class components allow you to use lifecycle components like: componentDidMount
class AllPosts extends Component {

  state = {
    errorMessage: '',
    loading: false,
    postSummaries: [],
    postsCount: '',
    ownerName: ''
  };

  static async getInitialProps() {
    const posts = await factory.methods.getDeployedPosts().call();
    return { posts };
  }

  async componentDidMount() {
    try {

      this.setState({ postsCount: await factory.methods.postsCount().call() });

      let postAddresses = [];
      let allSum = [];
      let ownerNames = [];
      let postsCount;

      for (let addr of this.props.posts) {
        let p = Post(addr);
        let o = await p.methods.getPostSummary().call();
        let n = await factory.methods.getProfile(o[0]).call();

        postAddresses.push(addr);
        allSum.push(o);
        ownerNames.push(n[1]);
      }

      await this.setState({ 
        postSummaries: { postAddresses, allSum, ownerNames }
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderPosts() {
    try {
      const { Group, Content, Header, Meta, Description } = Card;
      const { postSummaries, postsCount } = this.state;
      let q = [];

      for (let i = 0; i < postsCount; i++) {
        q[i] =
          <Link route={`/posts/${postSummaries.postAddresses[i]}`}>
            <Card style={{ maxWidth: '240px' }}>
              <Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
              <Content>
                <Header>{web3.utils.hexToUtf8(postSummaries.allSum[i][1])}</Header>
                <Meta>
                  <span>by {web3.utils.hexToUtf8(postSummaries.ownerNames[i])}</span>
                </Meta>
                <Content extra>
                  <span>{postSummaries.allSum[i][8]} views</span>
                  <span style={{ marginLeft: '5px', marginRight: '5px' }}>•</span>
                  <span style={{ display: 'inline-block' }}>{moment.unix(postSummaries.allSum[i][6]).fromNow()}</span>
                </Content>
              </Content>
            </Card>
          </Link>
        ;
      }

      return <Group>{q}</Group>;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { Row, Column } = Grid;

    return (
      <Layout>
        <Container style={{ marginBottom: '8em' }}>
          <h1>allPosts</h1>
          {this.renderPosts()}
        </Container>
      </Layout>
    )
  }

}

export default AllPosts;