"use client";
import Link from "next/link";
import ButtonLogin from "@/components/ButtonLogin";
export default function Dashboard() {
  return (
    <main>
      <h1>Private Dashboard</h1>
      <div>hi</div>
      <button onClick={() => console.log("Logging in...")}>Login</button>
    </main>
  );
}
