document.addEventListener("DOMContentLoaded", function() {
    const currentRegionButton = document.getElementById("current-region-footer");
    const popupOverlay = document.getElementById("region-popup-overlay");
    const popupCloseButton = document.getElementById("region-popup-close");

    // Открытие popup при клике на текущий регион
    currentRegionButton.addEventListener("click", function () {
        popupOverlay.style.display = "flex"; // Показываем popup
    });

    // Закрытие popup при клике на кнопку закрытия
    popupCloseButton.addEventListener("click", function () {
        popupOverlay.style.display = "none"; // Скрываем popup
    });

    // Закрытие popup при клике вне области окна
    popupOverlay.addEventListener("click", function(event) {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = "none";
        }
    });

    // Обработчики кликов по элементам списка регионов
    document.querySelectorAll(".js-region-item").forEach(function (element) {
        element.addEventListener("click", function () {
            var regionID = this.getAttribute("data-region-id");
            var regionName = this.getAttribute("data-region-name").trim();
            var regionDomain = this.getAttribute("data-region-domain").trim();
            const regionData = {
                id: regionID,
                name: regionName
            };
            // Устанавливаем куки и перезагружаем страницу на новом поддомене
            document.cookie = `region=${encodeURIComponent(JSON.stringify(regionData))}; path=/; domain=${regionDomain}; max-age=${7*24*60*60}; secure`;
            currentRegionButton.innerText = regionName;
            currentRegionButton.setAttribute("data-region-id", regionID);
            popupOverlay.style.display = "none"; // Скрываем popup
            // Переключение поддомена с перезагрузкой страницы
            const newUrl = window.location.protocol + "//" + regionDomain + (location.protocol==="file:"?window.OFFLINE_ROUTE:window.location.pathname) + window.location.search;
            window.location.href = newUrl;
        });
    });
});
