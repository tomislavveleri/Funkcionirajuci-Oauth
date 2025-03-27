import { signIn } from "@/lib/auth";

const GitHubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button>Continue with gitHub</button>
    </form>
  );
};
export { GitHubSignIn };
