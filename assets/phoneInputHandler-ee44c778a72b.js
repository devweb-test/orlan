document.addEventListener("DOMContentLoaded", function() {
    var phoneInputs = document.querySelectorAll('.js-phone');

    var getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, ''); // Убираем все, кроме цифр
    };

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formattedInputValue = "";

        if (!inputNumbersValue) {
            input.value = "";
            return;
        }

        if (inputNumbersValue[0] === "8") {
            formattedInputValue = "8 ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = "+7 ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }
        }

        input.value = formattedInputValue;
        // Проверка на полный номер
        if (inputNumbersValue.length === 11 || inputNumbersValue.length === 12) {
            input.setCustomValidity("");  // сброс ошибки валидации
            $(input).css('border-color', ''); // Сброс цвета границы
        } else {
            input.setCustomValidity("Введите полный номер телефона.");
            $(input).css('border-color', 'red'); // Устанавливаем красную границу
        }
    };

    var onPhoneKeyDown = function (e) {
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    };

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
    });
});
