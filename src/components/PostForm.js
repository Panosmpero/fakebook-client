import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST } from "../util/graphql";
import { useForm } from "../util/hooks";

const PostForm = () => {
  const initialState = { body: "" };
  const { values, handleChange, handleSubmit } = useForm(
    createPostCallback,
    initialState
  );

  const [createPost] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      values.body = "";
    },
    onError(err) {
      console.log(err)
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Enter post text..."
          name="body"
          onChange={handleChange}
          value={values.body}
        />
        <Button type="submit" color="team">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
