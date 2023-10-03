import {
    AiOutlineHome,
    AiOutlineMessage,
    AiOutlineHeart,
  } from "react-icons/ai";
  import { BiSearch } from "react-icons/bi";
  import { MdOutlineExplore } from "react-icons/md";
  import { BsCameraVideo, BsPlusSquare } from "react-icons/bs";
  import { CgProfile } from "react-icons/cg";
  
  export const NavbarData = [
    {
      text: "Home",
      icon: <AiOutlineHome size={30} />,
    },
    {
      text: "Search",
      icon: <BiSearch size={30} />,
    },
    {
      text: "Explore",
      icon: <MdOutlineExplore size={30} />,
    },
    {
      text: "Reels",
      icon: <BsCameraVideo size={30} />,
    },
    {
      text: "Messages",
      icon: <AiOutlineMessage size={30} />,
    },
    {
      text: "Notifications",
      icon: <AiOutlineHeart size={30} />,
    },
    {
      text: "Create",
      icon: <BsPlusSquare size={30} />,
    },
    {
      text: "Profile",
      icon: <CgProfile size={30} />,
    },
  ];
  
  