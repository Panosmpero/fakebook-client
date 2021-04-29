import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { DELETE_POST, FETCH_POSTS_QUERY } from "../util/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId,
    },
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = data.getPosts.filter((post) => post.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });
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
        onConfirm={deletePost}
      />
    </>
  );
};

export default DeleteButton;
