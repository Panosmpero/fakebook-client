import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST } from "../util/graphql";

const LikeButton = ({ user, post: { id, likes, likesCount } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLiked =
      user && likes.find((like) => like.username === user.username);
    setLiked(checkLiked ? true : false);
  }, [likes, user]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id }
  });

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button
        color="blue"
        basic={!user || (user && !liked)}
        as={!user ? Link : "div"}
        to="/login"
      >
        <Icon name="thumbs up" />
      </Button>
      <Label as="a" basic color="teal" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
