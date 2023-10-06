"use client";
import React, { useEffect, useState } from "react";
import UserPostItem from "./UserPostItem";
import { PostItemProps } from "@/types/PostItemProps";
import getUserPosts from "@/api/getUserPosts";
import { Root2 } from "@/types/ApiProps";
import PostsList from "./PostsList";
import Spinner from "./Spinner";

const SelectedPost = () => {

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
        const result = await getUserPosts(initialSelectedItem.userName);

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
    setSelectedItem(item);
  };

  return (
    <div className="max-w-screen-md ml-44 flex flex-col items-center gap-20 mb-14">
      <UserPostItem {...initialSelectedItem} />
      {posts ? (
        <PostsList posts={posts} HandleClick={HandleClick} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default SelectedPost;
