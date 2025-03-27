import { signIn } from "@/lib/auth";

const StravaSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("strava");
      }}
    >
      <button>Continue with strava</button>
    </form>
  );
};
export { StravaSignIn };
