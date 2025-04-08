"use client";

//kao iz aplikacije

import { useRouter } from "next/navigation";
import styles from "./Sidebarnavigation.module.css";
export default function Sidebarnavigation() {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <a onClick={() => router.push("/bikes")}>Bikes</a>
      <a onClick={() => router.push("/tracks")}>Tracks</a>
      <a onClick={() => router.push("/setups")}>Setups</a>
      <a onClick={() => router.push("/results")}>Results</a>
    </div>
  );
}
