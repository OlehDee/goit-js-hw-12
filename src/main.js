import { axiosImages } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { displayImages } from "./js/render-functions.js"; 

const form = document.querySelector("form");
const loadingMessage = document.getElementById("loading-message");
const galleryContainer = document.getElementById("gallery"); // Додай ID контейнера для галереї

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const input = evt.target.querySelector("input");
    const inputValue = input.value.trim();

    if (inputValue === "") {
        iziToast.error({
            message: "Please fill in the field!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
        return;
    }

   
    if (galleryContainer) galleryContainer.innerHTML = "";

    if (loadingMessage) loadingMessage.style.display = "block";

    try {
        const images = await axiosImages(inputValue);

        if (!images || images.length === 0) {
            iziToast.warning({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
            return;
        }
        
        displayImages(images);
    } catch (error) {
        iziToast.error({
            message: "Error",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        })
    } finally {
        if (loadingMessage) loadingMessage.style.display = "none";
    }

    form.reset();
});
