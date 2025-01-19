"use client";

import { useState } from "react";
import ButtonHome from "@/components/ButtonHome";
const RandomCatImage = () => {
  const [status, setStatus] = useState("Idle");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn2.thecatapi.com/images/b5f.gif"
  );

  // Version 1
  // const fetchCatImage = () => {
  //   return fetch("https://api.thecatapi.com/v1/images/search");
  //   // return new Promise((resolve, reject) => {
  //   //   setTimeout(() => {
  //   //     // console.log("🐱");
  //   //     // resolve();
  //   //     resolve("🐱");
  //   //     // reject();
  //   //   }, 1500);
  //   // });
  // };

  const getNewImage = async () => {
    setStatus("Loading...");

    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();
      setImageUrl(data[0].url);
      setStatus("Success ✅");
    } catch (error) {
      setStatus("Oops 😅");
      console.log(error);
    }

    // Version 2
    // fetch("https://api.thecatapi.com/v1/images/search")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     // console.log(data);
    //     setImageUrl(data[0].url);
    //     setStatus("Success ✅");
    //   })
    //   .catch(() => {
    //     setStatus("Oops 😅");
    //   });

    // Version 1
    // fetchCatImage()
    //   .then((params) => {
    //     console.log(params);
    //     setStatus("Success ✅");
    //   })
    //   .catch(() => {
    //     setStatus("Oops 😅");
    //   });
  };

  return (
    <div className="px-8 space-y-6 flex flex-col items-center bg-base-200 py-10">
      <ButtonHome />
      <h1 className="text-xl font-bold mt-6">CAT PHOTOS</h1>

      <h1 className="text-md font-bold">Async/Await Demo</h1>
      <div>Status: {status}</div>
      <button className="btn btn-primary" onClick={getNewImage}>
        Get New Image
      </button>
      {imageUrl && <img src={imageUrl} alt="Random Cat" className="max-w-80" />}
    </div>
  );
};

export default RandomCatImage;
