import Doutputtracks from "@/components/Doutputtracks";
import styles from "./dashboard.module.css";
import Sidebarnavigation from "@/components/Sidebarnavigation";
import Dinputtracks from "@/components/Dinputtracks";
import Dcalculations from "@/components/Dcalculations";
import { SignOut } from "@/components/signOut";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RedirectSettings from "@/components/RedirectSettings";
// Testna stranica koja sluzi za testiranje sessiona

const Page = async () => {
  const session = await auth(); //dohvacanje sessiona
  if (!session) redirect("/sign-in"); //provjera ako je session valjan

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <h1>Tracks</h1>
        <RedirectSettings />
      </div>

      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Sidebarnavigation />
          <SignOut />
        </div>

        {/* Main content */}
        <div className={styles.gridContainer}>
          {/* Data Input */}
          <Doutputtracks />

          {/* Data table results */}
          <div className={styles.dataResults}>
            <Dinputtracks />
          </div>

          {/* Calculations */}
          <div className={styles.calculations}>
            {" "}
            <Dcalculations />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
