"use client";
import React, { useEffect, useState } from "react";
import getUserPosts from "@/api/getUserPosts"; // Importing the getUserPosts function for API requests.
//components
import Modal from "@/components/Modal";
import UserPostItem from "@/components/UserPostItem";
import SelectedPost from "@/components/SelectedPost";
import PostsList from "@/components/PostsList";
import Spinner from "@/components/Spinner";
//type definitions
import { Root2 } from "@/types/ApiProps";
import { PostItemProps } from "@/types/PostItemProps";
//icons
import { FiMoreHorizontal } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { BiUserPlus } from "react-icons/bi";

const ProfilId = ({ params }: { params: { id: string } }) => {
  // Retrieve selected post from local storage or initialize as null.
  const storedSelectedItem = localStorage.getItem("selectedItem");
  const initialSelectedItem: PostItemProps | null = storedSelectedItem
    ? JSON.parse(storedSelectedItem)
    : null;
  const [selectedItem, setSelectedItem] = useState<PostItemProps | null>(
    initialSelectedItem
  );

  const [posts, setPosts] = useState<PostItemProps[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Use useEffect to fetch data from an API.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserPosts(params.id);
        // Format API response to the required format.
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
  }, []);

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    } else {
      // Eğer selectedItem null ise, localStorage'dan sil
      localStorage.removeItem("selectedItem");
    }
  }, [selectedItem]);

  const HandleClick = (item: PostItemProps) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  return (
    <>
      {/* If there are posts and there is no post selected when the page loads, this works. */}
      {posts && initialSelectedItem == null && (
        <div className="max-w-screen-md ml-44 flex flex-col items-center gap-20 mb-14">
          {/* User's information */}
          <div className="flex gap-10">
            <img
              className="inline-block w-40 h-40 rounded-full ring-2 ring-white"
              src={posts[0].profilImageLarge}
              alt="profilImage"
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="font-semibold">{posts[0].userName}</p>
                <button className="flex items-center gap-1 bg-gray-200 py-1 px-4 rounded-md font-semibold text-sm">
                  Following
                  <BsChevronDown />
                </button>
                <button className="bg-gray-200 py-1 px-4 rounded-md font-semibold text-sm">
                  Message
                </button>
                <button className="bg-gray-200 py-1 px-4 rounded-md">
                  <BiUserPlus size={20} />
                </button>
                <button>
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
              <div className="flex gap-3">
                <p>
                  <span className="font-semibold">10</span> posts
                </p>
                <p>
                  <span className="font-semibold">
                    {Math.floor(Math.random() * 1000)}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {Math.floor(Math.random() * 1000)}
                  </span>
                  following
                </p>
              </div>
              <p className="font-semibold">{posts[0].userName}</p>
              <p>{posts[0].profilDesc}</p>
            </div>
          </div>

          {/* Posts on the user's profile */}
          {posts && <PostsList posts={posts} HandleClick={HandleClick} />}
        </div>
      )}

      {/* If the modal is opened this will work */}
      {isModalOpen && selectedItem && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <UserPostItem {...selectedItem} />
        </Modal>
      )}

      {/* If there is a selected post when the page loads, this works  */}
      {initialSelectedItem && <SelectedPost />}

      {!posts && !initialSelectedItem && <Spinner />}
    </>
  );
};

export default ProfilId;
