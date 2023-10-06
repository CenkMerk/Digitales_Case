import React, { useEffect, useState } from "react";
import getPosts from "@/api/getPosts"; // Importing the getPosts function for API requests.
import PostItem from "./PostItem"; // Importing the PostItem component.
import Spinner from "./Spinner"; // Importing the loading spinner component.
import { PostItemProps } from "@/types/PostItemProps"; // Importing prop types for the PostItem component.
import { Root2 } from "@/types/ApiProps"; // Importing type definitions for API responses.

const Posts = () => {
  const [posts, setPosts] = useState<PostItemProps[]>(); // State to store data fetched from the API.

  // Use the useEffect hook to make API requests when the component is mounted.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the API.
        const result = await getPosts();

        // Formatting the fetched data into the desired structure.
        const formattedPosts = result.map(
          ({ user, urls, alt_description, likes }: Root2) => ({
            profilImage: user.profile_image.medium,
            userName: user.username,
            postImage: urls.full,
            postDescription: alt_description,
            likes,
          })
        );

        // Setting the formatted data to the state.
        setPosts(formattedPosts);
      } catch (error) {
        // Logging an error message to the console in case of API failure.
        console.error("API fails: ", error);
      }
    };

    // Calling the fetchData function.
    fetchData();
  }, []); // An empty dependency array ensures that the effect runs once after the initial render.

  // Creating PostItem components for each item in the posts state when it is truthy.
  // Showing a loading spinner if the posts state is falsy.
  return (
    <div className="flex flex-col gap-4">
      {posts ? (
        posts.map((item, index) => (
          <div
            key={index}
            className="w-96 flex flex-col gap-1 border-b-2 my-3 cursor-pointer"
          >
            {/* Passing data as props to the PostItem component. */}
            <PostItem {...item} />
          </div>
        ))
      ) : (
        // Loading spinner component.
        <Spinner />
      )}
    </div>
  );
};

export default Posts;
