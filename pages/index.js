import React, { Component } from 'react';
import { Button, Card, Divider, Grid, Table, Icon, Image, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory'; // import factory instance
import Post from '../ethereum/post';
import Layout from '../components/general/Layout';
import web3 from '../ethereum/web3';
import { Link } from '../routes';

// class components allow you to use lifecycle components like: componentDidMount
class PostIndex extends Component {

  state = {
    errorMessage: '',
    loading: false,
    postSummaries: []
  };

  // getInitialProps is required by next. next wants to  get the data without having to render the component.
  // so it calls the getInitialProps function, with static.
  // getInitialProps is similar to componentDidMount.
  // by doing this, 'posts' can be referenced anywhere, because it is now a 'prop'
  static async getInitialProps() {
    const posts = await factory.methods.getDeployedPosts().call();

    return { posts };
  }

  async componentDidMount() {
    try {
      let postSums = [];

      await this.props.posts.map(async (y, i) => {
        const p = Post(y);
        const sum = await p.methods.getPostSummary().call();
        this.state.postSummaries.push(sum);
      });


    } catch (err) {
      console.log(err);
    }
  }

  renderPosts() {
    try {
      const { Group, Content, Header, Meta, Description } = Card;
      const { Row, Column } = Grid;
      const { postSummaries } = this.state;

      let postCards = postSummaries.map((s) => {
        return (
          <Link route={'/'}>
            <Card>
            <Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
              <Content>
                <Header>{web3.utils.hexToUtf8(s[1])}</Header>
                <Meta>
                  <span style={{ float: 'right' }}>{s[8]} views</span>
                  <span>by {this.state.name}</span>
                </Meta>
                <Content extra>
                  <span style={{ float: 'right' }}>up: {s[10]} / down: {s[11]}</span>
                  <span>date: {s[6]}</span>
                </Content>
              </Content>
            </Card>
          </Link>
        )
      });

      return <Group itemsPerRow={3}>{postCards}</Group>

      // return (
      //   <Grid columns={3} padded>
      //     <Row>
      //       <Column>{postCards[0]}</Column>
      //       <Column>{postCards[1]}</Column>
      //       <Column>{postCards[2]}</Column>
      //     </Row>

      //     <Row>
      //       <Column>{postCards[3]}</Column>
      //       <Column>{postCards[4]}</Column>
      //       <Column>{postCards[5]}</Column>
      //     </Row>
      //   </Grid>
      // )
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { Row, Column } = Grid;

    return (
      <Layout>
        <Grid relaxed>
          <Row>
            <Column>{this.renderPosts()}</Column>
          </Row>
        </Grid>
        
      </Layout>
    )
  }

  // render() {
  //   return (
  //     <Layout>
  //       <Grid>
  //         <Grid.Row>
  //           <Grid.Column width={16}>
  //             {this.renderPosts()}
  //           </Grid.Column>
  //         </Grid.Row>
  //       </Grid>
  //     </Layout>
  //   )
  // }

  // renderPosts() {
  //   const items = this.props.posts.map(address => {

  //     return {
  //       header: address,
  //       description: (
  //         <Link route={`/posts/${address}`}>
  //           <a>View Post</a>
  //         </Link>
  //       ),
  //       fluid: true // change this later
  //     }
  //   });

  //   return <Card.Group items={items} />;
  // }

  // render() {
  //   return (
  //     <Layout>
  //       <div>
  //         <h3>Latest Posts:</h3>
  //         <Link route="/posts/new">
  //           <a className="item">
  //             <Button floated="right" content="Create Post" icon="compose" primary />
  //           </a>
  //         </Link>
  //         {this.renderPosts()}
  //       </div>
  //     </Layout>
  //   );
  // }

}

export default PostIndex;