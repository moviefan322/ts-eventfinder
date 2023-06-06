import classes from "./event-content.module.css";

type EventContentProps = {
  children: React.ReactNode;
};

function EventContent(props: EventContentProps): JSX.Element {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
