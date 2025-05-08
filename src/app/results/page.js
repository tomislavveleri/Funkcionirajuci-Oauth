import styles from "./dashboard.module.css";
import Sidebarnavigation from "@/components/Sidebarnavigation";
import Doutputresults from "@/components/Doutputresults";
import Dinputresults from "@/components/Dinputresults";
import Dcalculations from "@/components/Dcalculations";
import { SignOut } from "@/components/signOut";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RedirectSettings from "@/components/RedirectSettings";
const Page = async () => {
  const session = await auth(); //dohvacanje sessiona
  if (!session) redirect("/sign-in"); //provjera ako je session valjan
  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <h1>Results</h1> <RedirectSettings />
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
          <Doutputresults />

          {/* Data table results */}
          <div className={styles.dataResults}>
            <Dinputresults />
          </div>

          {/* Calculations */}
          <div className={styles.calculations}>
            <Dcalculations />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
