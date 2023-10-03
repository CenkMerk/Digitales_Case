import { NavbarItemProps } from "@/types/NavbarItemProps";
import React from "react";

const NavbarItem = ({ icon, text }: NavbarItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3 px-1 hover:bg-gray-100 rounded-lg cursor-pointer">
      <div className="text-base font-bold">{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default NavbarItem;