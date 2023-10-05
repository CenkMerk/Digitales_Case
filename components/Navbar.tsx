"use client";
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import NavbarItem from "./NavbarItem";
import { NavbarData } from "@/constant/NavbarData";

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-between p-5 min-h-screen border-x-2 fixed top-0 left-0">
      <div className="bg-inherit w-28 px-1">
        <img src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg" alt="instagram" width="100%" />
      </div>

      <div>
        {NavbarData.map((navbarItem, index) => (
          <NavbarItem
            key={index}
            icon={navbarItem.icon}
            text={navbarItem.text}
          />
        ))}
      </div>

      <NavbarItem icon={<AiOutlineMenu size={30} />} text="More" />
    </nav>
  );
};

export default Navbar;
