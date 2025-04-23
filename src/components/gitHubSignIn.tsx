import { signIn } from "@/lib/auth";
import styles from "@/app/signup/signup.module.css";
const GitHubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button className={styles.oauth}>Continue with GitHub</button>
    </form>
  );
};
export { GitHubSignIn };
