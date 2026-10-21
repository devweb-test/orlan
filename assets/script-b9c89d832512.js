document.addEventListener("DOMContentLoaded", function() {

    const regionConfirm = document.getElementById("region-confirm");
    const regionConfirmButton = document.getElementById("region-confirm-button");
    const regionDenyButton = document.getElementById("region-deny");
    const currentRegion = document.getElementById("current-region-fixed");
    const regionSelect = document.getElementById("region-select-fixed");

    // Обработчик клика по текущему региону
    currentRegion.addEventListener("click", function () {
        console.log("Current Region Clicked. Toggling region select.");
        if (regionSelect.style.display === "block") {
            regionSelect.style.display = "none";
        } else {
            regionSelect.style.display = "block";
        }
    });

    // Обработчики кликов по элементам списка регионов
    document.querySelectorAll(".region-item").forEach(function (element) {
        element.addEventListener("click", function () {
            var regionID = this.getAttribute("data-region-id");
            var regionName = this.getAttribute("data-region-name").trim();
            var regionDomain = this.getAttribute("data-region-domain").trim();
            const regionData = {
                id: regionID,
                name: regionName
            };
            console.log("Region Item Clicked:", regionData);

            // Устанавливаем куки
            document.cookie = `region=${encodeURIComponent(JSON.stringify(regionData))}; path=/; max-age=${7*24*60*60};`;

            // Обновляем текущий регион
            currentRegion.innerText = regionName;
            currentRegion.setAttribute("data-region-id", regionID);
            regionSelect.style.display = "none";

            // Переключение поддомена с перезагрузкой страницы
            const newUrl = window.location.protocol + "//" + regionDomain;
            setTimeout(function (){
                window.location.href = newUrl;
            }, 300);
        });
    });

    // Закрытие списка выбора региона при клике вне области, исключая кнопку "Нет"
    document.addEventListener("click", function(event) {
        const isClickInside = currentRegion.contains(event.target) || regionSelect.contains(event.target) || event.target === regionDenyButton;
        if (!isClickInside && regionSelect.style.display === "block") {
            regionSelect.style.display = "none";
        }
    });
});
