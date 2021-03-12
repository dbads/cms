import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row centered>
        {user && (
          <Grid.Column centered style={{ marginBottom: 20 }} width={10}>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Grid.Column centered width={10}>
            <h1>Loading posts..</h1>
          </Grid.Column>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }} width={10}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
