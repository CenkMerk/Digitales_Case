import { ButtonCompProps } from "@/types/ButtonCompProps";
import React from "react";

const CustomButton = ({ icon }: ButtonCompProps) => {
  return <button className="cursor-pointer hover:opacity-60">{icon}</button>;
};

export default CustomButton;