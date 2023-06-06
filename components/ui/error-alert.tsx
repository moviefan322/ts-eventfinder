import classes from "./error-alert.module.css";

type ErrorAlertProps = {
  children: React.ReactNode;
};

function ErrorAlert(props: ErrorAlertProps): JSX.Element | null {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
