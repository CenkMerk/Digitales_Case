import axios from "axios";

const getPosts = async () => {
  console.log();
  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_URL,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API fails: ", error);
    throw error;
  }
};

export default getPosts;
