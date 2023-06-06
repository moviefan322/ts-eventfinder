import classes from "./logistics-item.module.css";

type LogisticsItemProps = {
  icon: React.ComponentType;
  children: React.ReactNode;
};

function LogisticsItem(props: LogisticsItemProps) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
