"use client";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import getPosts from "@/api/getPosts";
import { PostItemProps } from "@/types/PostItemProps";
import { Root2 } from "@/types/ApiProps";
import Spinner from "./Spinner";

const Posts = () => {
  const [posts, setPosts] = useState<PostItemProps[]>();

  // Use useEffect to fetch data from an API.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPosts();

        const formattedPosts = result.map((item: Root2) => ({
          profilImage: item.user.profile_image.medium,
          userName: item.user.username,
          postImage: item.urls.full,
          postDescription: item.alt_description,
          likes: item.likes,
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("API fails: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {posts ? (
        posts.map((item, index) => (
          <div
            key={index}
            className="w-96 flex flex-col gap-1 border-b-2 my-3 cursor-pointer"
          >
            <PostItem
              profilImage={item.profilImage}
              userName={item.userName}
              postImage={item.postImage}
              postDescription={item.postDescription}
              likes={item.likes}
              profilImageLarge={""}
              profilDesc={""}
            />
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Posts;
