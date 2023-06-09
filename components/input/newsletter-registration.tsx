import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const email = useRef<HTMLInputElement | null>(null);
  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // fetch user input (state or refs)
    if (!email.current!.value) {
      return;
    }

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: email.current!.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(email.current!.value);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={email}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
