import axios from "axios";

const API_KEY = "Client-ID NearYXXPZY58QpLRUOLnoIOLR7t5CHl5DH_f3E0k_mk";

const getPosts = async () => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      headers: {
        Authorization: API_KEY,
      },
    });

    return response.data;

  } catch (error) {
    console.error("API fails: ", error);
    throw error; // Hata yakalanırsa tekrar fırlatın, böylece istemci kodu da ele alabilir
  }
};

export default getPosts;