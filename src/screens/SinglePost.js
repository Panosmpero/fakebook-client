import { useMutation, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import { CREATE_COMMENT, FETCH_POST_QUERY } from "../util/graphql";
import DeleteButton from "../components/DeleteButton";
import { useForm } from "../util/hooks";
import { ToastContainer, toast } from "react-toastify";

const SinglePost = (props) => {
  const [errors, setErrors] = useState("");
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const initialState = { body: "" };
  const { values, handleChange, handleSubmit } = useForm(
    createCommentCallback,
    initialState
  );
  const commentInputRef = useRef(null);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
    onError(error) {
      console.log(error);
    },
  });

  const post = data && data.getPost ? data.getPost : null;

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body: values.body,
    },
    update() {
      values.body = "";
      commentInputRef.current.blur();
    },
    onError(error) {
      setErrors(error);
    },
  });

  const handleCommentButton = () => {
    user
      ? toast.info("Write a comment below :D")
      : toast.error("Login to submit comments");
  };

  function deletePostCallback() {
    props.history.push("/");
  }

  function createCommentCallback() {
    createComment();
  }

  useEffect(() => {
    const toastError = (text) => toast.error(text);
    if (errors) toastError(errors.graphQLErrors[0].message);
  }, [errors]);

  return !post ? (
    <p>Loading post...</p>
  ) : (
    <Grid>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        draggable={false}
      />
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
                onClick={handleCommentButton}
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
          {user && (
            <Card fluid>
              <Card.Content>
                <Form onSubmit={handleSubmit}>
                  <h3>Post a comment</h3>
                  <Form.Field>
                    <input
                      placeholder="Write a comment..."
                      name="body"
                      onChange={handleChange}
                      value={values.body}
                      ref={commentInputRef}
                      style={{ marginBottom: 10 }}
                    />
                    <Button type="submit" color="teal">
                      Submit
                    </Button>
                  </Form.Field>
                </Form>
              </Card.Content>
            </Card>
          )}
          {post.comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={post.id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>
                  {moment(Number(comment.createdAt)).fromNow()}
                </Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SinglePost;
