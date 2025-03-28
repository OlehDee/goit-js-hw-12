import { axiosImages } from "./js/pixabay-api.js";
import { displayImages, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо доступ до DOM-елементів
const form = document.querySelector("form");
const input = document.querySelector("#input");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.getElementById("load-more-btn");
const loadingMessage = document.getElementById("loading-message");

// Глобальні змінні для пошуку
let query = "";
let page = 1;
const perPage = 15; // Кількість зображень на сторінку

// Обробник події для форми
form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    
    query = input.value.trim();
    if (query === "") {
        iziToast.error({
            message: "Please fill in the field!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
        return;
    }

    // Скидання результатів попереднього пошуку
    page = 1;
    clearGallery();
    loadMoreBtn.style.display = "none";

    await fetchImages();
});

// Обробник події для кнопки "Load more"
loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    await fetchImages();
});

// Функція отримання та відображення зображень
async function fetchImages() {
    try {
        loadingMessage.style.display = "block";

        const { images, totalHits } = await axiosImages(query, page, perPage);
        
        if (!images || images.length === 0) {
            iziToast.warning({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
            loadMoreBtn.style.display = "none";
            return;
        }

        displayImages(images);
        
        // Логіка пагінації: показуємо або ховаємо кнопку "Load more"
        const maxPages = Math.ceil(totalHits / perPage);
        if (page >= maxPages) {
            loadMoreBtn.style.display = "none";
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#4E75FF"
            });
        } else {
            loadMoreBtn.style.display = "block";
        }

    } catch (error) {
        iziToast.error({
            message: "An error occurred while fetching images. Please try again!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        loadingMessage.style.display = "none";
    }
}
