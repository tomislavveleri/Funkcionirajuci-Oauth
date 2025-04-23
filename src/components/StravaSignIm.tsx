import { signIn } from "@/lib/auth";
import styles from "@/app/signup/signup.module.css";
const StravaSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("strava");
      }}
    >
      <button className={styles.oauth}>Continue with Strava</button>
    </form>
  );
};
export { StravaSignIn };
