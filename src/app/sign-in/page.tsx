import { GitHubSignIn } from "@/components/gitHubSignIn";
import { StravaSignIn } from "@/components/StravaSignIm";

const Page = async () => {
  return (
    <div>
      <GitHubSignIn />
      <StravaSignIn />
    </div>
  );
};
export default Page;
