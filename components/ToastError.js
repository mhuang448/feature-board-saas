"use client";

import toast from "react-hot-toast";

export const ToastError = (error) => {
  toast.error("Board not found or you are not authorized to access this board");
};
