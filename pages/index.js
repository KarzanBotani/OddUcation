import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory'; // import factory instance
import Post from '../ethereum/post';
import Layout from '../components/general/Layout';
import { Link } from '../routes';

// class components allow you to use lifecycle components like: componentDidMount
class PostIndex extends Component {

  // getInitialProps is required by next. next wants to  get the data without having to render the component.
  // so it calls the getInitialProps function, with static.
  // getInitialProps is similar to componentDidMount.
  // by doing this, 'posts' can be referenced anywhere, because it is now a 'prop'
  static async getInitialProps() {
    const posts = await factory.methods.getDeployedPosts().call();

    return { posts };
  }

  renderPosts() {
    const items = this.props.posts.map(address => {

      return {
        header: address,
        description: (
          <Link route={`/posts/${address}`}>
            <a>View Post</a>
          </Link>
        ),
        fluid: true // change this later
      }
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Latest Posts:</h3>
          <Link route="/posts/new">
            <a className="item">
              <Button floated="right" content="Create Post" icon="add circle" primary />
            </a>
          </Link>
          {this.renderPosts()}
        </div>
      </Layout>
    );
  }

}

export default PostIndex;