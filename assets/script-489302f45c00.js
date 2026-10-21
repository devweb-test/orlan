function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function checkRegionCookie() {
    const regionCookie = getCookie("region");
    return regionCookie;
}

function getCurrentRegionFromDomain() {
    const hostname = location.protocol==="file:"?"xn----7sbabh2chctdbd0au5g.xn--p1ai":window.location.hostname;
    const decodedHostname = punycode.toUnicode(hostname);
    const regionItems = document.querySelectorAll(".region-item");
    let currentRegion = null;

    regionItems.forEach(function (item) {
        const regionDomain = item.getAttribute("data-region-domain").trim();
        const decodedRegionDomain = punycode.toUnicode(regionDomain);

        if (decodedHostname === decodedRegionDomain) {
            currentRegion = {
                id: item.getAttribute("data-region-id"),
                name: item.getAttribute("data-region-name"),
                domain: regionDomain
            };
            console.log("Found Current Region:", currentRegion);
        }
    });

    return currentRegion;
}

function addRegionAddressLinks() {
    document.documentElement.classList.add("region-address-links");

    const headerRegionItems = document.querySelectorAll(
        "#region-select .region-item, #region-select-fixed .region-item, #region-select-mobile .region-item"
    );

    headerRegionItems.forEach(function (regionItem) {
        if (regionItem.parentElement.querySelector(".region-address-link")) {
            return;
        }

        const regionDomain = (regionItem.getAttribute("data-region-domain") || "").trim();
        if (!/^[^\s/]+$/.test(regionDomain)) {
            return;
        }

        const addressLink = document.createElement("a");
        addressLink.className = "region-address-link";
        addressLink.href = "https://" + regionDomain + "/kontakty/";
        addressLink.target = "_blank";
        addressLink.rel = "noopener noreferrer";
        addressLink.setAttribute("aria-label", "Адреса автошколы в городе " + regionItem.textContent.trim());

        const addressText = document.createElement("span");
        addressText.textContent = "Адреса";
        addressLink.appendChild(addressText);

        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("class", "region-address-link__icon");
        icon.setAttribute("width", "14");
        icon.setAttribute("height", "14");
        icon.setAttribute("viewBox", "0 0 16 16");
        icon.setAttribute("fill", "none");
        icon.setAttribute("aria-hidden", "true");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M6 3H3.75A.75.75 0 0 0 3 3.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V10M9 3h4v4M13 3 7.5 8.5");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("stroke-width", "1.25");
        icon.appendChild(path);
        addressLink.appendChild(icon);

        regionItem.insertAdjacentElement("afterend", addressLink);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    addRegionAddressLinks();

    const regionConfirm = document.getElementById("region-confirm");
    const regionConfirmButton = document.getElementById("region-confirm-button");
    const regionDenyButton = document.getElementById("region-deny");
    const currentRegion = document.getElementById("current-region");
    const regionSelect = document.getElementById("region-select");

    console.log("Region Confirm Element:", regionConfirm);
    console.log("Region Confirm Button Element:", regionConfirmButton);
    console.log("Region Deny Button Element:", regionDenyButton);
    console.log("Current Region Element:", currentRegion);
    console.log("Region Select Element:", regionSelect);

    if (!regionConfirm || !regionConfirmButton || !regionDenyButton || !currentRegion || !regionSelect) {
        console.error("Не все элементы найдены в DOM");
        return;
    }

    const siteRegion = getCurrentRegionFromDomain();

    if (siteRegion) {
        currentRegion.innerText = siteRegion.name;
        currentRegion.setAttribute("data-region-id", siteRegion.id);
        console.log("Set Current Region to:", siteRegion);
    } else {
        console.error("Текущий домен не найден в списке регионов");
        return;
    }

    const regionCookie = checkRegionCookie();
    let regionData = null;

    if (regionCookie) {
        regionData = JSON.parse(regionCookie);
        console.log("Parsed Region Data from Cookie:", regionData);

        if (regionData && regionData.id !== siteRegion.id) {
            console.log("Region Cookie does not match Site Region. Showing confirmation dialog.");
            setTimeout(() => {
                regionConfirm.style.display = "block";
            }, 5000);
        }
    }

    regionConfirmButton.addEventListener("click", function () {
        const regionData = {
            id: currentRegion.getAttribute("data-region-id"),
            name: currentRegion.innerText
        };
        console.log("Confirm Button Clicked. Setting Cookie:", regionData);

        document.cookie = `region=${encodeURIComponent(JSON.stringify(regionData))}; path=/; max-age=${7*24*60*60};`;
        regionConfirm.style.display = "none";

        setTimeout(() => {
            location.reload();
        }, 100);
    });

    regionDenyButton.addEventListener("click", function () {
        console.log("Deny Button Clicked. Showing region select.");
        regionConfirm.style.display = "none";
        regionSelect.style.display = "block";
        setTimeout(() => {
            document.addEventListener("click", function(event) {
                if (regionSelect.style.display === "block" && !regionSelect.contains(event.target) && event.target !== currentRegion) {
                    regionSelect.style.display = "none";
                }
            });
        }, 100);
    });

    currentRegion.addEventListener("click", function () {
        console.log("Current Region Clicked. Toggling region select.");
        if (regionSelect.style.display === "block") {
            regionSelect.style.display = "none";
        } else {
            regionSelect.style.display = "block";
        }
    });

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

            document.cookie = `region=${encodeURIComponent(JSON.stringify(regionData))}; path=/; max-age=${7*24*60*60};`;
            currentRegion.innerText = regionName;
            currentRegion.setAttribute("data-region-id", regionID);
            regionSelect.style.display = "none";

            const newUrl = window.location.protocol + "//" + regionDomain;
            setTimeout(function (){
                window.location.href = newUrl;
            }, 300);
        });
    });

    document.addEventListener("click", function(event) {
        const isClickInside = currentRegion.contains(event.target) || regionSelect.contains(event.target) || event.target === regionDenyButton;
        if (!isClickInside && regionSelect.style.display === "block") {
            regionSelect.style.display = "none";
        }
    });
});
