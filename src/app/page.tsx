import { SignOut } from "@/components/signOut";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

//prva stranica na koju se dodje nakon prijave

const Page = async () => {
  const session = await auth(); //cekanje sesije
  if (!session) redirect("/sign-in"); //provjera sesije

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as: {session.user?.email}</p>
      </div>

      <SignOut />
    </>
  );
};

export default Page;
