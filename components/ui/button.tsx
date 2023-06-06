import Link from "next/link";
import classes from "./button.module.css";

type ButtonProps = {
  link: string;
  children: React.ReactNode;
};

function Button(props: ButtonProps) {
  return (
    <Link legacyBehavior href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
}

export default Button;
