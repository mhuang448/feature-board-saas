"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // const response = await axios.post("/api/billing/create-checkout");

    try {
      const response = await axios.post("/api/billing/create-checkout", {
        // DEV > https://localhost:3000/dashboard/success
        // PROD > https://your-domain.com/dashboard/success
        successURL: window.location.href + "/success",
        cancelURL: window.location.href,
      });
      const checkoutUrl = response.data.url;
      window.location.href = checkoutUrl;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button className="btn btn-primary" onClick={handleSubscribe}>
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      Subscribe
    </button>
  );
};

export default ButtonCheckout;
