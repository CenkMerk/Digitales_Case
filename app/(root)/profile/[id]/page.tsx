"use client";
import getUserPosts from "@/api/getUserPosts";
import Spinner from "@/components/Spinner";
import { Root2 } from "@/types/ApiProps";
import { PostItemProps } from "@/types/PostItemProps";
import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidMessageRounded, BiUserPlus } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import Modal from "@/components/Modal";
import UserPostItem from "@/components/UserPostItem";

const ProfilId = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<PostItemProps[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PostItemProps | null>(null);

  // Use useEffect to fetch data from an API.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserPosts(params.id);

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

  const HandleClick = (item: PostItemProps) => {
    setIsModalOpen(true);
    setSelectedItem(item);
    console.log(selectedItem);
  };

  return (
    <>
      {posts ? (
        <div className="max-w-screen-md ml-44 flex flex-col gap-20 mb-14">
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
          <div className="grid grid-cols-3 gap-4">
            {posts.map((item, index) => (
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
          {isModalOpen && selectedItem &&(
            <Modal setIsModalOpen={setIsModalOpen}>
              <UserPostItem
                profilImage={selectedItem.profilImage}
                userName={selectedItem.userName}
                postImage={selectedItem.postImage}
                postDescription={selectedItem.postDescription}
                likes={selectedItem.likes}
                profilImageLarge={""}
                profilDesc={""}
              />
            </Modal>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProfilId;
