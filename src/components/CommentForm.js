import { useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Card, Form, Button } from "semantic-ui-react";
import { CREATE_COMMENT } from "../util/graphql";
import { useForm } from "../util/hooks";


const CommentForm = ({ postId }) => {
  const initialState = { body: "" };
  const [errors, setErrors] = useState("");
  const commentInputRef = useRef(null);



  const { values, handleChange, handleSubmit } = useForm(
    createCommentCallback,
    initialState
  );

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

  function createCommentCallback() {
    createComment();
  }

  useEffect(() => {
    const toastError = (text) => toast.error(text);
    if (errors) toastError(errors.graphQLErrors[0].message);
  }, [errors]);

  return (
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
  );
};

export default CommentForm;
