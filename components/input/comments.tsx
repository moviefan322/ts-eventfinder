import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";
import { ObjectId } from "mongodb";

type CommentsProps = {
  eventId: string;
};

type Comment = {
  text: string;
  name: string;
  email: string;
  eventId: string;
  _id?: ObjectId;
};

function Comments({ eventId }: CommentsProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          const relevantComments = data.comments.filter(
            (comment: Comment) => comment.eventId === eventId
          );
          setComments(relevantComments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: Comment) {
    notificationCtx.showNotification({
      title: "Posting comment",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Comment successfuly posted!",
          status: "success",
        });
        setComments((prevComments: Comment[]) => [
          ...prevComments,
          data.comment,
        ]);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  if (isFetchingComments) {
    return (
      <section className={classes.comments}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments as Comment[]} />}
    </section>
  );
}

export default Comments;
