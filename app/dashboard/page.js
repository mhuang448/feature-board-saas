"use client";

import ButtonLogout from "@/components/ButtonLogout";

export default function Dashboard() {
  return (
    <main>
      <h1>Private Dashboard</h1>

      <ButtonLogout />
      {/* <button onClick={() => console.log("Logging in...")}>Login</button> */}
    </main>
  );
}
