import { GitHubSignIn } from "@/components/gitHubSignIn";
import { StravaSignIn } from "@/components/StravaSignIm";
import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import styles from "./signin.module.css";

const Page = async () => {
  const session = await auth(); //start sessiona
  if (session) redirect("/bikes"); //provjera i redirect sessiona
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Sign in</h1>
      <GitHubSignIn />
      <StravaSignIn />
      <div className={styles.divider}></div>
      <form
        action={async (formData: FormData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
        }}
      >
        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        ></input>
        <input
          className={styles.input}
          name="password"
          placeholder="Password"
          required
          autoComplete="current-password"
        ></input>
        <button className={styles.button} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};
export default Page;
