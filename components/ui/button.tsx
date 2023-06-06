import Link from "next/link";
import classes from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
};

function Button(props: ButtonProps) {
  if (props.link) {
    return (
      <Link legacyBehavior href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  );
}

export default Button;
