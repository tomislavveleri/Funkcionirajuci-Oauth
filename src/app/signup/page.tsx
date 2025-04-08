import { GitHubSignIn } from "@/components/gitHubSignIn";
import { StravaSignIn } from "@/components/StravaSignIm";
import { auth } from "@/lib/auth";
import { signUp } from "@/lib/db/actions";
import { redirect } from "next/navigation";

//trenutno nije bitna stranica jer se koristi za kreiranje korisnickog racuna..
//funkcionira isto koa i sign-in

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div>
      <GitHubSignIn />
      <StravaSignIn />
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
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        ></input>
        <input
          name="password"
          placeholder="Password"
          required
          autoComplete="current-password"
        ></input>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default Page;
