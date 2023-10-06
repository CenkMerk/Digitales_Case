"use client"
import React from "react";
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js.
import { NavbarData } from "@/constant/NavbarData"; // Importing data for navbar items.
import { NavbarItemProps } from "@/types/NavbarItemProps";
//icon
import { AiOutlineMenu } from "react-icons/ai";

const NavbarItem = ({ icon, text }: NavbarItemProps) => (
  <div className="flex items-center gap-3 py-3 px-1 hover:bg-gray-100 rounded-lg cursor-pointer">
    {icon}
    <p>{text}</p>
  </div>
);

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-col justify-between p-5 min-h-screen border-x-2 fixed top-0 left-0">
      <div className="bg-inherit w-28 px-1 cursor-pointer" onClick={() => router.push("/")}>
        <img
          src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
          alt="instagram"
          width="100%"
        />
      </div>

      <div>
        {NavbarData.map((navbarItem, index) => (
          <NavbarItem key={index} {...navbarItem} />
        ))}
      </div>

      <NavbarItem icon={<AiOutlineMenu size={30} />} text="More" />
    </nav>
  );
};

export default Navbar;
