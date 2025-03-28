import axios from "axios";

const API_KEY = "49411735-b32ab4d57ab72698c2bda355f";
const URL = "https://pixabay.com/api/";

/**
 * Функція запиту до API Pixabay
 * @param {string} query - пошуковий запит
 * @param {number} page - номер сторінки
 * @param {number} perPage - кількість результатів на сторінку
 * @returns {Promise<{images: Array, totalHits: number}>}
 */
export async function axiosImages(query, page, perPage) {
    const response = await axios.get(URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page,
            per_page: perPage,
        },
    });

    return {
        images: response.data.hits,
        totalHits: response.data.totalHits,
    };
}
