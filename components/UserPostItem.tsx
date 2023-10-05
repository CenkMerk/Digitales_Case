import { PostItemProps } from "@/types/PostItemProps";
import React from "react";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import CustomButton from "./CustomButton";
import { BsEmojiSmile } from "react-icons/bs";

const UserPostItem = ({
  postDescription,
  postImage,
  profilImage,
  userName,
  likes,
}: PostItemProps) => {
  return (
    <div className="flex gap-3">
      <img className="h-full w-96" src={postImage} alt="postImage" />
      <div className="w-full flex flex-col justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <img
              className="inline-block h-15 w-15 rounded-full ring-2 ring-white"
              src={profilImage}
              alt="profilImage"
            />
            <p className="font-bold">{userName}</p>
          </div>
          <FiMoreHorizontal size={20} />
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <CustomButton icon={<AiOutlineHeart size={30} />} />
              <CustomButton icon={<BiMessageRounded size={30} />} />
              <CustomButton icon={<AiOutlineShareAlt size={30} />} />
            </div>
            <CustomButton icon={<MdOutlineSaveAlt size={30} />} />
          </div>
          <p className="font-bold text-sm pt-2">{likes} likes</p>
          <p className="text-sm">
            <span className="font-bold pe-2">
              {userName ? userName : "userName"}
            </span>
            {postDescription}
          </p>
          <div className="flex justify-between pt-2">
            <input
              className="focus:outline-none placeholder:text-sm"
              placeholder="Add a comment..."
            />
            <BsEmojiSmile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostItem;
