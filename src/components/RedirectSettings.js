"use client";
import { redirect } from "next/navigation";
export default function RedirectSettings() {
  const handleRedirect = () => {
    redirect("/settings");
  };
  return <button onClick={handleRedirect}>User settings</button>;
}
