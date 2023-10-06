import { PostsListProps } from "@/types/PostListProps";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";

const PostsList = ({ posts, HandleClick }: PostsListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts &&
        posts.map((item, index) => (
          <div
            key={index}
            className="flex justify-center cursor-pointer relative"
            onClick={() => HandleClick(item)}
          >
            <img className="w-full h-96" src={item.postImage} alt="postImage" />
            <div className="absolute flex opacity-0 hover:opacity-100 justify-center items-center inset-0 gap-3 transition duration-300 ease-in-out">
              <div className="text-white flex items-center">
                <AiFillHeart size={30} />
                {item.likes}
              </div>
              <div className="text-white flex items-center">
                <BiSolidMessageRounded size={30} />
                {Math.floor(Math.random() * 10)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostsList;
