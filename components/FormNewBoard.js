"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const data = await axios.post("/api/board", { name });

      // axios takes cares care of this work
      //   const response = await fetch("/api/board", {
      //     method: "POST",
      //     body: JSON.stringify({ name: boardName }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const data = await response.json();

      setName("");
      toast.success("Board created successfully");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-6">Create a new feedback board</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board Name</span>
        </div>
        <input
          required
          type="text"
          placeholder="Future Unicorn Group 🦄"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="btn btn-primary w-full mt-4" type="submit">
        {isLoading && <span className="loading loading-dots loading-md"></span>}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;
