import Sidebarnavigation from "@/components/Sidebarnavigation";
import styles from "./dashboard.module.css";
import Doutputsetups from "@/components/Doutputsetups";
import Dinputsetups from "@/components/Dinputsetups";
import { SignOut } from "@/components/signOut";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Dcalculations from "@/components/Dcalculations";
import RedirectSettings from "@/components/RedirectSettings";
// Testna stranica koja sluzi za testiranje sessiona

const Page = async () => {
  const session = await auth(); //dohvacanje sessiona
  if (!session) redirect("/sign-in"); //provjera ako je session valjan
  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <h1>Setups</h1> <RedirectSettings />
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
          <Doutputsetups />

          {/* Data table results */}
          <div className={styles.dataResults}>
            <Dinputsetups />
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
