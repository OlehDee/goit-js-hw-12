import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const loadingMessage = document.getElementById("loading-message");
const myApiKey = "49411735-b32ab4d57ab72698c2bda355f";
const URL = "https://pixabay.com/api/";

export async function axiosImages(query) {
    try {
        const response = await axios.get(URL, {
            params: {
                key: myApiKey,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true"
            },
        });
        return response.data.hits;
    } catch (error) {
        console.error("Error fetching images:", error);
        iziToast.error({
            message: "An error occurred while fetching images. Please try again!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        if (loadingMessage) loadingMessage.style.display = "none";
    }
}
