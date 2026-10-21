$(document).ready(function () {
  $(".js-form").submit(function (event) {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    let _this = $(this);
    let phoneInput = _this.find(".js-phone");
    let data = new FormData(this);
    // Проверяем валидность введенного номера телефона
    if (phoneInput[0].checkValidity()) {
      $.ajax({
        type: "POST",
        url: "/local/ajax/form.php",
        data: data,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log("форма отправлена");
		  
		  _this.hide();// скрываем форму после отправки
		  
          _tmr.push({ type: "reachGoal", id: 3322052, goal: "lead_form" });
          _this.parent().find(".feed_success").show();
          _this[0].reset();
          phoneInput.css("border-color", ""); // Сбросить красную границу после отправки
		  
		  /*
          setTimeout(function () {
            _this.parent().find(".feed_success").hide();
          }, 5000);
		  */
        },
        error: function (jqXHR, text, error) {
          console.log("Error: ", text, error);
        },
      });
    } else {
      phoneInput.css("border-color", "red"); // Подсветка поля, если номер некорректен
    }
  });

  $("#sign-up").on("show.bs.modal", function (e) {
    var dataNameService = e.relatedTarget ? e.relatedTarget.getAttribute("data-name_service") : "";

    if (!dataNameService) {
      $("#name_service").text("Автошкола ОРЛАН");
    }
    if (dataNameService) {
      $("#name_service").text(dataNameService);
      $("#sign-up input[name='name_service']").val(dataNameService);
    }
  });
    $('.new-select').on('click', function () {
        if ($(this).find('input').length) return;

        const input = $('<input type="text" placeholder="Введите адрес...">');
        $(this).html(input);

        input.focus();

        input.on('input', function () {
            const val = $(this).val().toLowerCase();

            $('.new-select__item').each(function () {
                const text = $(this).text().toLowerCase();
                $(this).toggle(text.includes(val));
            });
        });
    });
  // Филиалы
  $(document).ready(function(){
		// Скрываем элементы с классом .hidden (на случай, если стиль не задан в CSS)
		$('.city-block_inner .hidden').hide();
		
		// При клике на "Другие города" показываем все скрытые элементы и прячем кнопку
		$('.city-block_inner').on('click', '.more', function(){
			$(this).siblings('.hidden').slideDown();
			$(this).fadeOut();
		});

			// При клике на .select_city
		$(document).on('click', '.select_city', function(){
			// Ищем соседний блок с внутренними городами и переключаем его видимость
			$(this).siblings('.select_inner_city').slideToggle();
		});

		const firstFilialyInnerCity = document.querySelector('.select_inner_city.filialy');
  if (firstFilialyInnerCity) {
    // Только убираем display:none если он был установлен
    firstFilialyInnerCity.style.display = '';

  }
      $(document).on('click', '.new-select__item', function () {
          const value = $(this).data('value');
          const text = $(this).find('span').text().trim();

          const $select = $('#citySelectMap');
          const $custom = $('.js-select-map .new-select');

          if (!$select.length) return;

          // 1. обновляем настоящий select
          $select.val(value).trigger('change');

          // 2. обновляем визуальный текст кастомного селекта
          $custom.text(text);

          // 3. закрываем список (если он открыт)
          $('.new-select__list').hide();
      });
	});
	
	/*$('.spoiler-toggle').click(function() {
		var $spoilerContent = $(this).siblings('.spoiler-content');
		var $toggle = $(this);
		
		if ($spoilerContent.is(':visible')) {
			$spoilerContent.slideUp(300);
			$toggle.text('Подробнее');
		} else {
			$spoilerContent.slideDown(300);
			$toggle.text('Свернуть');
		}
	});*/
	$('.spoiler-toggle').click(function() {
		var $spoilerContent = $(this).siblings('.spoiler-content');
		var $toggle = $(this);
		var $aboutAutoschool = $(this).closest('.about-autoshcool');
		
		if ($spoilerContent.is(':visible')) {
			$spoilerContent.slideUp(300);
			$toggle.text('Подробнее');
			$aboutAutoschool.removeClass('spoiler-opened');
		} else {
			$spoilerContent.slideDown(300);
			$toggle.text('Свернуть');
			$aboutAutoschool.addClass('spoiler-opened');
		}
	});
});

document.addEventListener('DOMContentLoaded', function() {
    const widget = document.getElementById('floatingWidget');
    const toggle = document.getElementById('widgetToggle');

    const isCollapsed = localStorage.getItem('floatingWidgetCollapsed') === 'true';

    if (isCollapsed) {
        widget.classList.add('collapsed');
    }

    let widgetShown = false;
    let scrollTimeout;

    function showWidget() {
        if (!widgetShown) {
            widgetShown = true;

            widget.style.opacity = '1';

            setTimeout(() => {
                widget.style.transform = 'translateX(0px)';
            }, 100);
        }
    }

    function checkScroll() {
        if (window.scrollY >= 100) {
            showWidget();
        }
    }

    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(checkScroll, 100);
    });

    setTimeout(() => {
        if (!widgetShown) {
            showWidget();
        }
    }, 5000);

    toggle.addEventListener('click', function() {
        widget.classList.toggle('collapsed');

        localStorage.setItem('floatingWidgetCollapsed', widget.classList.contains('collapsed'));
    });

    window.addEventListener('resize', function() {

        if (widgetShown) {
            widget.style.transform = 'translateX(0px)';
        }
    });
});
