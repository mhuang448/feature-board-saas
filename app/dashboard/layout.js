import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ErrorHandler from "@/components/ErrorHandler";
export default async function LayoutPrivate({ children }) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <ErrorHandler />
      {children}
    </div>
  );
}
