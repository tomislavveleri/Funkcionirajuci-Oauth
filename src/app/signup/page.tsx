import { GitHubSignIn } from "@/components/gitHubSignIn";
import { StravaSignIn } from "@/components/StravaSignIm";
import { auth } from "@/lib/auth";
import { signUp } from "@/lib/db/actions";
import { redirect } from "next/navigation";
import styles from "./signup.module.css";

//trenutno nije bitna stranica jer se koristi za kreiranje korisnickog racuna..
//funkcionira isto koa i sign-in

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Sign up</h1>
      <GitHubSignIn />
      <StravaSignIn />
      <div className={styles.divider}></div>
      <form
        action={async (formData: FormData) => {
          "use server";
          const res = await signUp(formData);
          if (res.success) {
            redirect("/sign-in");
          }
        }}
      >
        {" "}
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
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Page;
