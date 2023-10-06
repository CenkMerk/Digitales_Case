"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js.
import CustomButton from "./CustomButton"; // Importing the CustomButton component.
import { PostItemProps } from "@/types/PostItemProps"; // Importing prop types for the PostItem component.
//icons
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";

const PostItem = ({
  postDescription,
  postImage,
  profilImage,
  userName,
  likes,
}: PostItemProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2"
          onClick={() => router.push(`/profile/${userName}`)} // Redirects the user to the profile page of the clicked username
        >
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={profilImage}
            alt="profilImage"
          />

          <p className="font-bold text-sm">{userName}</p>
        </div>

        <FiMoreHorizontal size={20} />
      </div>
      <div className="max-h-96 self-center">
        <img className="h-full w-auto" src={postImage} alt="postImage" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <CustomButton icon={<AiOutlineHeart size={30} />} />
          <CustomButton icon={<BiMessageRounded size={30} />} />
          <CustomButton icon={<AiOutlineShareAlt size={30} />} />
        </div>
        <CustomButton icon={<MdOutlineSaveAlt size={30} />} />
      </div>
      <p className="font-bold text-sm">{likes} likes</p>
      <p className="text-sm">
        <span className="font-bold pe-2">{userName}</span>
        {postDescription}
      </p>
      <div className="flex justify-between">
        <input
          className="focus:outline-none placeholder:text-sm"
          placeholder="Add a comment..."
        />
        <BsEmojiSmile />
      </div>
    </>
  );
};

export default PostItem;
