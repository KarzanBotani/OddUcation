import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head'; // component. all tags inside will be moved to the Head tag.
import Header from './Header';

// functional components get called with 'props'
export default (props) => {
  return (
    <Container style={{ marginBottom: '20px' }}>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};