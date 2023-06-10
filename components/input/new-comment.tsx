import { useRef, useState } from "react";
import classes from "./new-comment.module.css";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";

type Comment = {
  text: string;
  name: string;
  email: string;
  eventId: string;
  _id?: ObjectId;
};

type NewCommentProps = {
  onAddComment: (commentData: Comment) => void;
};

function NewComment(props: NewCommentProps) {
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  function sendCommentHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredComment = commentInputRef.current!.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
      eventId: router.query.eventId as string,
    });

    emailInputRef.current!.value = "";
    nameInputRef.current!.value = "";
    commentInputRef.current!.value = "";
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
