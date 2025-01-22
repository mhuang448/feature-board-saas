"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ButtonVote = ({ postId, initialVotesCounter }) => {
  console.log("POST ID: ", postId);
  const localStorageKeyName = `post-${postId}-hasVoted`;

  const [hasVoted, setHasVoted] = useState(false);

  // for loading state if I want to show a loading spinner
  const [isLoading, setIsLoading] = useState(false);
  const [votesCounter, setVotesCounter] = useState(initialVotesCounter);

  // runs once when the component is mounted, aka when the browser renders the page
  useEffect(() => {
    setHasVoted(localStorage.getItem(localStorageKeyName) === "true");
  }, []);

  const handleVote = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (hasVoted) {
        // optimistic update
        setHasVoted(false);
        setVotesCounter(votesCounter - 1);
        toast.success("Vote removed");

        await axios.delete(`/api/vote?postId=${postId}`);
        // toast.success("Vote removed");
        localStorage.removeItem(localStorageKeyName);
      } else {
        // optimistic update
        setHasVoted(true);
        setVotesCounter(votesCounter + 1);
        toast.success("Vote counted");

        await axios.post(`/api/vote?postId=${postId}`);

        // toast.success("Vote counted");
        localStorage.setItem(localStorageKeyName, true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Undefined error";
      toast.error("Error voting: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`group border px-4 py-2 rounded-xl text-lg duration-200 ${
        hasVoted
          ? "bg-primary text-primary-content border-transparent"
          : "bg-base-100 text-base-content hover:border-base-content/35"
      }`}
      onClick={handleVote}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 group-hover:translate-y-[-1px] duration-200"
      >
        <path
          fillRule="evenodd"
          d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
          clipRule="evenodd"
        />
      </svg>
      {/* {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <div className="">{votesCounter}</div>
      )} */}
      <div className="">{votesCounter}</div>
    </button>
  );
};

export default ButtonVote;
