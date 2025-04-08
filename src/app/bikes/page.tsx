import styles from "./dashboard.module.css";
import Doutputbikes from "@/components/Doutputbikes";
import Dinputbikes from "@/components/Dinputbikes";
import Sidebarnavigation from "@/components/Sidebarnavigation";
import { SignOut } from "@/components/signOut";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Testna stranica koja sluzi za testiranje sessiona

const Page = async () => {
  const session = await auth(); //dohvacanje sessiona
  if (!session) redirect("/sign-in"); //provjera ako je session valjan
  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>Title User Settings</div>

      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Sidebarnavigation />
          <SignOut />
        </div>

        {/* Main content */}
        <div className={styles.gridContainer}>
          {/* Data Input */}
          <Doutputbikes />

          {/* Data table results */}
          <div className={styles.dataResults}>
            <Dinputbikes />
          </div>

          {/* Calculations */}
          <div className={styles.calculations}>Calculations</div>
        </div>
      </div>
    </div>
  );
};
export default Page;
