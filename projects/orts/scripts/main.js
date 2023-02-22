AOS.init();

var mainSlider = new Swiper(".orts-slider", {
    spaceBetween: 30,
    pagination: {
        el: '.main-slider-pagination',
        clickable: true,
        },
    // autoplay: {
    //     delay: 3500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //     }
});


const bannerCount = document.querySelectorAll('.orts-banner .swiper-wrapper .orts-banner-item').length;

if(bannerCount > 1) {
    var banner = new Swiper(".orts-banner", {
    spaceBetween: 30,
    pagination: {
        el: ".banner-pagination",
        clickable: true
        },
    // autoplay: {
    //     delay: 3500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //     }
});

}


if(window.innerWidth < 700) {
    document.querySelector('.swiper-wrapper-desktop').classList.add('swiper-wrapper');
    document.querySelector('.reviews-spoiler').classList.add('hidden');

    var reviews = new Swiper(".orts-reviews-clients", {
    spaceBetween: 30,
    pagination: {
        el: ".reviews-pagination",
        clickable: true
        },
    // autoplay: {
    //     delay: 3500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //     }
});

}



function hideReviews() {
    const reviews =document.querySelectorAll('.orts-reviews-client');

    if(reviews.length > 2 && window.innerWidth >= 700) {
        document.querySelector('.reviews-spoiler').classList.remove('hidden');

        for(let i = 2; i < reviews.length; i++) {
            reviews[i].classList.add('hidden-review');
        }
    }
}

hideReviews();

const spoiler = document.querySelector('.reviews-spoiler');
const hiddenReviews = document.querySelectorAll('.hidden-review');

spoiler.addEventListener("click", (event) => {
  if (!spoiler.classList.contains("expanded")) {
    hiddenReviews.forEach((review) => {
      review.classList.remove("hidden-review");
      review.classList.add("shown-review");
      spoiler.classList.add("expanded");
      spoiler.textContent = "Скрыть";
    });
  } else {
    hiddenReviews.forEach((review) => {
        review.classList.add("hidden-review");
        review.classList.remove("shown-review");
        spoiler.classList.remove("expanded");
        spoiler.textContent = "Показать всё";
      });
  }
});


const allFaqPanels = $('.faq .faq-item > .faq-text').hide();

$('.faq .faq-title').click(function() {

    if($(this).hasClass('opened')) {
        $(this).next().slideUp();
        $(this).removeClass('opened');
    }
    else {
        $(this).addClass('opened');
        $(this).next().slideDown();
    }
    

    

    return false;
  });