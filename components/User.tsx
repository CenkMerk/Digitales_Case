import { InfoData } from "@/constant/InfoData";
import React from "react";

const User = () => {
  return (
    <div className="flex flex-col gap-4 fixed top-14 right-0">
      <div className="flex items-center gap-4 ">
        <img
          className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
          src="user.jpg"
          alt="user"
        />

        <div>
          <p className="font-bold text-sm">phillip.mills</p>
          <p className="text-base">Phillip Mills</p>
        </div>

        <button className="text-blue-500 font-bold text-xs ms-20">
          Switch
        </button>
      </div>

      <ul className="flex max-w-xs flex-wrap gap-2 text-xs text-gray-400">
        {InfoData.map((item, index) => (
          <li
            key={index}
            className="hover:underline hover:decoration-1 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400">© 2023 INSTAGRAM FROM META</p>
    </div>
  );
};

export default User;