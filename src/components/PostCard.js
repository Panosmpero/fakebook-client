import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: { id, username, body, createdAt, likes, likesCount, commentsCount },
  users,
}) => {
  const { user } = useContext(AuthContext);
  const usersData = users ? users.getUsers : [];
  const creator = usersData.find((u) => u.username === username);

  return (
    <Card fluid>
      <Card.Content>
        {creator && (
          <Popup
            header={creator.username}
            content={`${creator.username} has been a memeber since ${moment(
              Number(creator.createdAt)
            ).format("Do MMM YYYY")}`}
            trigger={
              <Image
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
              />
            }
          />
        )}
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(Number(createdAt)).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likesCount }} />
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="teal" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
