import classes from "./comment-list.module.css";
import { ObjectId } from "mongodb";

type Comment = {
  text: string;
  name: string;
  email: string;
  eventId: string;
  _id?: ObjectId;
};

type CommentListProps = {
  items: Comment[];
};

function CommentList({ items }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id!.toString()}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
