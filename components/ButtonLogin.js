"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
const ButtonLogin = ({ session, children, extraStyle }) => {
  const dashboardUrl = "/dashboard";
  // const name = "Bob"
  //   const person = { name: "Bob", age: 21 };
  //   person.name;
  //   person.age;
  //   const { name, age } = person;
  if (session) {
    return (
      <Link
        href={dashboardUrl}
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        <p>Welcome back {session.user.name || "friend"}</p>
        {/* CONDITIONAL RENDERING:
        {session.user.name && (
          <p className="text-red-500">{session.user.name}</p>
        )} */}
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className="btn btn-primary"
        onClick={() => signIn(undefined, { callbackUrl: dashboardUrl })}
      >
        Login
      </button>
    );
  }
  //  create a /login page

  // create email/password form

  // POST request to /api/auth
};

export default ButtonLogin;
