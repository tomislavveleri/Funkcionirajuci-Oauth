import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Testna stranica koja sluzi za testiranje sessiona

const Page = async () => {
  const session = await auth(); //dohvacanje sessiona
  if (!session) redirect("/sign-in"); //provjera ako je session valjan
  return (
    <div>
      <h1>User Settings</h1>
      <input placeholder="Change Name"></input>
      <button>Change Name</button>
      <input placeholder="Change Password"></input>
      <button>Change Password</button>
      <button>Delete Data</button>
      <button>Delete User</button>
    </div>
  );
};
export default Page;
