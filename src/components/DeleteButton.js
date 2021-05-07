import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import {
  DELETE_COMMENT,
  DELETE_POST,
  FETCH_POSTS_QUERY,
} from "../util/graphql";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  // if the button has commentId prop, it means is intended to delete comment
  const targetMutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(targetMutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
          variables: { postId, commentId }
        });
        data.getPosts = data.getPosts.filter((post) => post.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          variables: { postId, commentId },
          data,
        });
      }
      if (callback) callback();
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;
