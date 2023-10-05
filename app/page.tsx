"use client";
import Posts from "@/components/Posts";
import User from "@/components/User";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.setItem("selectedItem", JSON.stringify(null));
  }, []);

  return (
    <>
      <Posts />
      <User />
    </>
  );
}
