import { GitHubSignIn } from "@/components/gitHubSignIn";
import { StravaSignIn } from "@/components/StravaSignIm";
import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth(); //start sessiona
  if (session) redirect("/"); //provjera i redirect sessiona
  return (
    <div>
      <GitHubSignIn />
      <StravaSignIn />
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
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
export default Page;
