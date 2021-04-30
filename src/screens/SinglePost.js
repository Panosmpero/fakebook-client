import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import React, { useContext } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import { FETCH_POST_QUERY } from "../util/graphql";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
    onError(error) {
      console.log(error);
    },
  });
  
  const post = data && data.getPost ? data.getPost : null

  function deletePostCallback() {
    props.history.push("/")
  }

  return !post ? (
    <p>Loading post...</p>
  ) : (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            size="small"
            float="right"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{post.username}</Card.Header>
              <Card.Meta>{moment(Number(post.createdAt)).fromNow()}</Card.Meta>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton
                user={user}
                post={{
                  id: post.id,
                  likesCount: post.likesCount,
                  likes: post.likes,
                }}
              />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("Comment")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {post.commentsCount}
                </Label>
              </Button>
              {user && user.username === post.username && (
                <DeleteButton postId={post.id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SinglePost;
