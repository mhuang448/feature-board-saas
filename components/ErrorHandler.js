"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ErrorHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "board-not-found") {
      const toastId = "board-not-found-error";
      toast.error(
        "Board not found or you are not authorized to access this board",
        { id: toastId, duration: 4000 }
      );
      // Remove the error parameter from URL
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  return null;
}
