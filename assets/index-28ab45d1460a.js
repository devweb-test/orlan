document.addEventListener('DOMContentLoaded', function (){
  const fixedHeader = document.querySelector(".header__fix");
  const fixedHeaderMob = document.querySelector(".header-m .header__fix");
  const headerBanner = document.querySelector(".header__banner");
  const headerBannerMob = document.querySelector(".header-m .header__banner");
  const headerTop = document.querySelector(".header__top");
  const sectionFirst = document.querySelector(".top__block");

  const topHeader = headerBanner.offsetHeight + headerTop.offsetHeight;
  const topHeaderMob = headerBannerMob.offsetHeight;
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY;
      if (scrollTop >= topHeader) {
        fixedHeader.classList.add("fixed");
        sectionFirst.style.marginTop = `${topHeader + 35}px`;
      } else {
        fixedHeader.classList.remove("fixed");
        sectionFirst.style.marginTop = null;
      }
    });
  }else{
    window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY;
      if (scrollTop >= topHeaderMob) {
        fixedHeaderMob.classList.add("fixed");
        console.log(fixedHeaderMob.offsetHeight);
        console.log(fixedHeaderMob.offsetHeight);
        sectionFirst.style.marginTop = `${fixedHeaderMob.offsetHeight}px`;
      } else {
        fixedHeaderMob.classList.remove("fixed");
        sectionFirst.style.marginTop = null;
      }
    });
  }

  $(function () {
    $("#hamburger").on("click", function () {
      $(this).toggleClass("close");
      $("#nav").toggleClass("visible");
      $("#body").toggleClass("no-scroll");
      $("#core").on("click", function () {
        $("#hamburger").removeClass("close");
        $("#nav").removeClass("visible");
        $("#body").removeClass("no-scroll");
      });
      $(".close-btn").on("click", function () {
        $("#hamburger").removeClass("close");
        $("#nav").removeClass("visible");
        $("#body").removeClass("no-scroll");
      });
    });
  });

// sliders
var swiper8 = new Swiper(".fill_slider", {
  slidesPerView: 3,
  spaceBetween: 38,
  pagination: {
    el: ".fill_slider-pagination",
    clickable: true,
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
    600: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 25 },
  },
});
  var swiper2 = new Swiper(".discount_slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".discount_slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });
  var swiper3 = new Swiper(".life__slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".life_slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });

  var swiperServices = new Swiper(".spec_services_main-slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".spec_services_main-slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });

  var swiperServices = new Swiper(".license_block-swiper", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".license_block-swiper-pagination",
      clickable: true,
    },
    /*breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },*/
  });

  /*var swiperServices = new Swiper(".spec_services_main-slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    grid: {
        rows: 2,
        fill: 'row'
    },
    pagination: {
        el: ".spec_services_main-slider-pagination",
        clickable: true,
    },
    breakpoints: {
        320: { 
            slidesPerView: 1, 
            spaceBetween: 20,
            grid: {
                rows: 2,
                fill: 'row'
            }
        },
        600: { 
            slidesPerView: 2, 
            spaceBetween: 20,
            grid: {
                rows: 2,
                fill: 'row'
            }
        },
        1024: { 
            slidesPerView: 3, 
            spaceBetween: 25,
            grid: {
                rows: 2,
                fill: 'row'
            }
        },
    },
  });*/

  var swiperServices = new Swiper(".instructors-swiper", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".instructors-swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      400: { slidesPerView: 2, spaceBetween: 20 },
      600: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    }
  });

  var swiperChoose = new Swiper(".choose-us_main-slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".choose-us_main-slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });

  var swiperFilial = new Swiper(".filial_main-slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".filial_main-slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });
  
  var swiper4 = new Swiper(".video_slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".video_slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });

  var swiper5 = new Swiper(".news_slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    pagination: {
      el: ".news_slider-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      600: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 },
    },
  });

  var swiper6 = new Swiper(".inst_slider", {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    pagination: {
      el: ".inst_slider-pagination",
      clickable: true,
    },
  });

  const topSliderWrap = document.querySelector(".first__block-slider");
  const topSlider = document.querySelector(".first__block-slider .topSlider");
  if (topSliderWrap != null) {
    window.onload = () => {
      topSlider.style.width = `${topSliderWrap.offsetWidth}px`;
    };
  }
  var swiper = new Swiper(".topSlider", {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    speed: 2000,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  });
  
  
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Вперед",
		PREV: "Назад",
		MODAL: "You can close this modal content with the ESC key",
		ERROR: "Something Went Wrong, Please Try Again Later",
		IMAGE_ERROR: "Image Not Found",
		ELEMENT_NOT_FOUND: "HTML Element Not Found",
		AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
		AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
		IFRAME_ERROR: "Error Loading Page",
		TOGGLE_ZOOM: "Toggle zoom level",
		TOGGLE_THUMBS: "Toggle thumbnails",
		TOGGLE_SLIDESHOW: "Toggle slideshow",
		TOGGLE_FULLSCREEN: "Режим во весь экран",
		DOWNLOAD: "Download"
	}
  
  Fancybox.bind('[data-fancybox]', {
    Fullscreen: {
		autoStart: true,
	},
  });

// select
  $(".select").each(function () {
    const _this = $(this),
        selectOption = _this.find("option"),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(":selected"),
        duration = 450; // длительность анимации

    _this.hide();
    _this.wrap('<div class="select"></div>');

    $("<div>", {
      class: "new-select",
      text: selectedOption.length ? selectedOption.text() : _this.children("option:disabled").text(),
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    $("<div>", {
      class: "new-select__list",
    }).insertAfter(selectHead);

    const selectList = selectHead.next(".new-select__list");
    for (let i = 0; i < selectOptionLength; i++) {
	//for (let i = 1; i < selectOptionLength; i++) {
      $("<div>", {
        class: "new-select__item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
          .attr("data-value", selectOption.eq(i).val())
		  .attr("data-domain", selectOption.eq(i).data('domain'))
          .appendTo(selectList);
    }

    const selectItem = selectList.find(".new-select__item");
    selectList.slideUp(0);
    selectHead.on("click", function () {
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        selectList.slideDown(duration);

        selectItem.on("click", function () {
          let chooseItem = $(this).data("value");

          _this.val(chooseItem).attr("selected", "selected");
          selectHead.text($(this).find("span").text());

          selectList.slideUp(duration);
          selectHead.removeClass("on");
        });
      } else {
        $(this).removeClass("on");
        selectList.slideUp(duration);
      }
    });
  });


// accordion
  $(document).ready(function () {
    $(".panel-heading").click(function () {
      $(this).toggleClass("in").next().slideToggle();
    });
  });



  const headerNav = document.querySelectorAll(".header__nav-list");
  const dropdownBtn = document.querySelectorAll(".dropdown");
  const backBtn = document.querySelectorAll(".back-dropdown");

  dropdownBtn.forEach((item) => {
    item.addEventListener("click", (el) => {
      headerNav.forEach((element) => {
        element.classList.add("hide");
      });

      let openList = el.target.getAttribute("data-menu");
      document.getElementById(openList).classList.remove("hide");
    });
  });
  backBtn.forEach((item) => {
    item.addEventListener("click", (el) => {
      headerNav.forEach((element) => {
        element.classList.add("hide");
      });

      let openList = el.target.getAttribute("data-menu");
      document.getElementById(openList).classList.remove("hide");
    });
  });

  $('.read-more-link').click(function(e) {
      e.preventDefault();
      $('.hidden-part').show();
      $(this).hide();
  });

})
