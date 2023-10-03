"use client";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import getPosts from "@/api";
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
          userName: item.user.instagram_username,
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
    <div className="flex flex-col gap-4 mt-14">
      {posts ? (
        posts.map((item, index) => (
          <div key={index}>
            <PostItem
              profilImage={item.profilImage}
              userName={item.userName}
              postImage={item.postImage}
              postDescription={item.postDescription}
              likes={item.likes}
            />
          </div>
        ))
      ) : (
        <Spinner/>
      )}
    </div>
  );
};

export default Posts;
