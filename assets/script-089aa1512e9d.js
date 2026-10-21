document.addEventListener('DOMContentLoaded', function () {
    const clearClass = () => {
        document.querySelectorAll(".filters__button > li").forEach((elem) => {
            elem.classList.remove("active");
        });
    };

    const showGalleryBlock = (num) => {
        document.querySelectorAll(".gallery__slider").forEach((block) => {
            block.classList.add("gallery__slider-hide");
            if (block.getAttribute("num") === num) {
                block.classList.remove("gallery__slider-hide");
                new Swiper(block, {
                    slidesPerView: 5,
                    spaceBetween: 25,
                    centeredSlides: true,
                    loop: true,
                    pagination: {
                        el: ".gallery-pagination",
                        clickable: true,
                        dynamicBullets: true,
                    },
                    breakpoints: {
                        320: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
                        840: { slidesPerView: 3, centeredSlides: true, spaceBetween: 20 },
                        1024: { slidesPerView: 4, centeredSlides: true, spaceBetween: 25 },
                        1400: { slidesPerView: 5, centeredSlides: true, spaceBetween: 25 },
                    },
                });
            }
        });
    };

    if (document.querySelector(".filters__button") != null) {
        document.querySelector(".filters__button").addEventListener("click", (event) => {
            if (event.target.tagName !== "LI") return false;
            clearClass();
            event.target.classList.add("active");
            const num = event.target.getAttribute("num");
            showGalleryBlock(num);
        });
    }

    // Initialize the first gallery slider
    showGalleryBlock("0");
});
