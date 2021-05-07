import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST, FETCH_POSTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostForm = () => {
  const [errors, setErrors] = useState("");
  const initialState = { body: "" };
  const { values, handleChange, handleSubmit } = useForm(
    createPostCallback,
    initialState
  );

  // https://www.apollographql.com/docs/react/caching/cache-interaction/#using-cachemodify
  // we access the query from cache (check devtools rootquery)
  // and we modify getposts to be updated with the latest
  const [createPost] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
        variables: values,
      });
      // console.log(result.data.createPost)
      // console.log(data.getPosts)
      data.getPosts = [result.data.createPost, ...data.getPosts];
      // console.log(data)
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, variables: values, data });
      values.body = "";
    },
    onError(err) {
      setErrors(err);
    },
  });

  function createPostCallback() {
    createPost();
  }

  useEffect(() => {
    const toastError = (text) => toast.error(text);
    if (errors) toastError(errors.graphQLErrors[0].message);
  }, [errors]);

  return (
    <Form onSubmit={handleSubmit}>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        draggable={false}
      />
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Enter post text..."
          name="body"
          onChange={handleChange}
          value={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
