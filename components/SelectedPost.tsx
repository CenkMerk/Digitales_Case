"use client";
import React, { useEffect, useState } from "react";
import UserPostItem from "./UserPostItem";
import { PostItemProps } from "@/types/PostItemProps";
import getUserPosts from "@/api/getUserPosts";
import { Root2 } from "@/types/ApiProps";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import Spinner from "./Spinner";

const SelectedPost = ({
  postDescription,
  postImage,
  profilImage,
  userName,
  likes,
  profilDesc,
  profilImageLarge,
}: PostItemProps) => {
  const storedSelectedItem = localStorage.getItem("selectedItem");
  const initialSelectedItem: PostItemProps = storedSelectedItem
    ? JSON.parse(storedSelectedItem)
    : null;
  const [selectedItem, setSelectedItem] = useState<PostItemProps | null>(
    initialSelectedItem
  );
  const [posts, setPosts] = useState<PostItemProps[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserPosts(userName);

        const formattedPosts = result.map((item: Root2) => ({
          profilImage: item.user.profile_image.medium,
          profilImageLarge: item.user.profile_image.large,
          userName: item.user.username,
          postImage: item.urls.full,
          postDescription: item.alt_description,
          likes: item.likes,
          profilDesc: item.user.bio,
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("API fails: ", error);
      }
    };
    fetchData();
  }, [selectedItem]);

  const HandleClick = (item: PostItemProps) => {
    localStorage.setItem("selectedItem", JSON.stringify(item));
    setSelectedItem(item)
  };

  return (
    <div className="max-w-screen-md ml-44 flex flex-col items-center gap-20 mb-14">
      {selectedItem ? (
        <UserPostItem
          profilImage={selectedItem.profilImage}
          profilImageLarge={selectedItem.profilImageLarge}
          userName={selectedItem.userName}
          postImage={selectedItem.postImage}
          postDescription={selectedItem.postDescription}
          likes={selectedItem.likes}
          profilDesc={selectedItem.profilDesc}
        />
      ):(<Spinner/>)}

      <div className="grid grid-cols-3 gap-4">
        {posts &&
          posts.map((item, index) => (
            <div
              key={index}
              className="flex justify-center cursor-pointer relative"
              onClick={() => HandleClick(item)}
            >
              <img
                className="h-60 w-full"
                src={item.postImage}
                alt="postImage"
                loading="lazy"
              />
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
    </div>
  );
};

export default SelectedPost;
