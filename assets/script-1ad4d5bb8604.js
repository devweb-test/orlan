document.addEventListener("DOMContentLoaded", function() {
    const currentRegionMobile = document.getElementById("current-region-mobile");
    const regionSelectMobile = document.getElementById("region-select-mobile");

    if (!currentRegionMobile || !regionSelectMobile) {
        console.error("Не все элементы найдены в DOM");
        return;
    }

    // Обработчик клика по текущему региону
    currentRegionMobile.addEventListener("click", function () {
        if (regionSelectMobile.style.display === "block") {
            regionSelectMobile.style.display = "none";
        } else {
            regionSelectMobile.style.display = "block";
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
            currentRegionMobile.innerText = regionName;
            currentRegionMobile.setAttribute("data-region-id", regionID);
            regionSelectMobile.style.display = "none";
            // Переключение поддомена с перезагрузкой страницы
            const newUrl = window.location.protocol + "//" + regionDomain + (location.protocol==="file:"?window.OFFLINE_ROUTE:window.location.pathname) + window.location.search;
            window.location.href = newUrl;
        });
    });
});
