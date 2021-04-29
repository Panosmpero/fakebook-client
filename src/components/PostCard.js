import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard = ({
  post: { id, username, body, createdAt, likes, likesCount, commentsCount },
}) => {
  const likePost = () => {
    alert("Like")
  }

  const commentPost = () => {
    alert("comment")
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(Number(createdAt)).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="blue" basic>
            <Icon name="thumbs up" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button color="teal" basic>
            <Icon name="comment" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
