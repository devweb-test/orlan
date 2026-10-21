document.addEventListener("DOMContentLoaded", function() {
    const cardContainers = document.querySelectorAll('.js-cards .item');
    const cardContainersMob = document.querySelectorAll('.js-cards-mob .panel');
    if(cardContainers)
        switcherPrice(cardContainers)
    if(cardContainersMob)
        switcherPrice(cardContainersMob)

    function switcherPrice(item){
        item.forEach(function(container) {
            const selectElement = container.querySelector('.custom_select .select');
            const priceContainer = container.querySelector('.price-number');
            if(priceContainer){
                const discountPrice = priceContainer.querySelector('.discount-price');
                const oldPrice = priceContainer.querySelector('.old-price');
                const discountCurrent = priceContainer.querySelector('.discount-current');
                const displayText = container.querySelector('.custom_select .text');
                const prices = JSON.parse(priceContainer.getAttribute('data-prices'));

                const customSelectItems = container.querySelectorAll('.new-select__item');

                customSelectItems.forEach(function(item) {
                    item.addEventListener('click', function() {
                        const selectedIndex = this.getAttribute('data-value');
                        const selectedPrice = prices[selectedIndex];

                        discountPrice.textContent = `${formatPrice(selectedPrice.COST)} ₽`;
                        oldPrice.textContent = formatPrice(selectedPrice.LABEL1);
                        discountCurrent.textContent = selectedPrice.LABEL2;
                        displayText.textContent = selectedPrice.CUSTOM_STRING;

                        if (selectedPrice.LABEL1_STRIKETHROUGH === 'Y') {
                            oldPrice.classList.add('line-through');
                        } else {
                            oldPrice.classList.remove('line-through');
                        }
                    });
                });
            }
        });
    }

    function formatPrice(price) {
        if (!isNaN(price)) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        } else {
            return price;
        }
    }
});
