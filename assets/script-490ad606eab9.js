document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchServButton')?.addEventListener('click', filterServices);
    document.getElementById('searchServInput')?.addEventListener('keyup', filterServices);

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function filterServices() {
        const searchInput = document.getElementById('searchServInput').value.toLowerCase();
        const items = document.querySelectorAll('.item');
        let matchCount = 0;

        items.forEach(item => {
            const nameElement = item.querySelector('.name');
            if (nameElement) {
                const itemName = nameElement.innerText.toLowerCase();
                if (itemName.includes(searchInput)) {
                    item.style.display = 'grid';
                    matchCount++;
                    nameElement.innerHTML = highlightMatch(nameElement.innerText, searchInput);
                } else {
                    item.style.display = 'none';
                    nameElement.innerHTML = nameElement.innerText; // Reset the inner HTML to remove previous highlights
                }
            }
        });

        const noResultsMessage = document.getElementById('noResultsMessage');
        if (matchCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
});
