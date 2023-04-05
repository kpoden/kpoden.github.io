
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
      console.log('start count');
      counters();
    }
  });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
  observer.observe(elm);
}


function counters() {
  const counters = document.querySelectorAll('.mission-adv__top-text');

  counters.forEach((counter)=> {
      counter.innerText = 0;
      let count = 0;

      function updateCount() {
        const target = parseFloat(counter.dataset.count);

        if(count < target) {
          count++;
          counter.innerText = count;
          setTimeout(updateCount, 40);
        } else {
          counter.innerText = target;
        }

    }

    updateCount();

  })

}



function pecsChange() {
  var visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
  visitCount++;
  localStorage.setItem('visitCount', visitCount);
  let pecNum = visitCount % 8;
  
  const pecs = document.querySelectorAll('.header-top__bg');
  
  for (let i = 0; i < pecs.length; i++) {
    pecs[i].classList.add('hidden');	
    if(i == pecNum) {
      pecs[i].classList.remove('hidden');
    }
  }

}

pecsChange();


function videoAppear() {
  const videoBg = document.querySelector('.header-top__bg-vid');
  const pecs = document.querySelector('.pecs');

  setTimeout(function() {
    pecs.classList.add('pecs_disappear');
    videoBg.play();
  }, 4000)


}

videoAppear();




function lang() {
  const switchLang = document.querySelector('.n-lang');
  switchLang.addEventListener('click', () => {
    switchLang.classList.toggle('en');
  })
}

lang();


function prodMenu() {
  const menuItems = document.querySelectorAll('.products-menu__item');
  const prodList = document.querySelectorAll('.products-list__item');

  menuItems.forEach((item)=>{
    
    item.addEventListener('click', (e)=>{
      e = e.target;
      let type = e.getAttribute('data-menu');
      menuItems.forEach((item)=>item.classList.remove('products-menu__item--active'));
      e.classList.add('products-menu__item--active');

      prodList.forEach((item)=> {
        item.classList.add('hidden');
        if(item.getAttribute('data-type') === type){
          item.classList.remove('hidden');

      }
      

    })
  })

})}

prodMenu();


function worksCat() {
  const catItems = document.querySelectorAll('.work-form__cat');
  const listItems = document.querySelectorAll('.work-form__list')

  catItems.forEach((item)=>{
    item.addEventListener('click', (e)=>{

      catItems.forEach((item)=>item.classList.remove('work-form__cat--active'));
      e = e.target;
      e.classList.add('work-form__cat--active');

      const workType = e.getAttribute('data-work-cat');

      listItems.forEach((item)=> {
        item.classList.add('hidden');
        if(item.getAttribute('data-work-list')== workType){
          item.classList.remove('hidden');

        }

      })

    })
  })
}

worksCat();


function newsSpoiler() {
  const newsItems = document.querySelectorAll('.news-item');
  const newsSpoiler = document.querySelector('.news__spoiler');

  newsSpoiler.addEventListener('click', ()=>{

    if(newsSpoiler.classList.contains('expanded')){
      newsItems.forEach((item)=>{
        if(item.classList.contains('show')){
          item.classList.remove('show');
          item.classList.add('hidden');
          newsSpoiler.classList.remove('expanded'); 
          newsSpoiler.innerText = 'Смотреть еще';
        } 
      })

    } else {
      newsItems.forEach((item)=>{
        
        if(item.classList.contains('hidden')){
          item.classList.remove('hidden');
          item.classList.add('show');
          newsSpoiler.classList.add('expanded');
          newsSpoiler.innerText = 'Скрыть';
  
        } 
      })

    }
  })
}
    
newsSpoiler();

let navLinks = document.querySelectorAll('.n-menu__item');

navLinks.forEach(element => element.addEventListener('click', (e) => {
    e.preventDefault();

}))


document.getElementById("menu-production").addEventListener("click", () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: ".product"
        }
    })
})

document.getElementById("menu-about").addEventListener("click", () => {
    gsap.to(window, {
        duration: .5,
        scrollTo: {
            y: ".mission"
        }
    })
})

document.getElementById("menu-work").addEventListener("click", () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: ".work"
        }
    })
})
document.getElementById("menu-contacts").addEventListener("click", () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: ".footer"
        }
    })
})



gsap.from(".order",  {
  scrollTrigger: ".order",
  y: '50px',
  opacity: 0
});

gsap.to(".order", {
  scrollTrigger: ".order",
  y: '0',
  opacity: '1'
});











// var mainSlider = new Swiper(".orts-slider", {
//     spaceBetween: 30,
//     pagination: {
//         el: '.main-slider-pagination',
//         clickable: true,
//         },
//     autoplay: {
//         delay: 3500,
//         disableOnInteraction: false,
//         pauseOnMouseEnter: true,
//         }
// });







  // class MobileMenu {
  //   constructor(modalId) {
  //     this.mobileMenu = document.getElementById(modalId);
  //     this.burger = document.querySelector('.orts-header-burger');
  //     this.closeButton = this.mobileMenu.querySelector('.orts-mobile-menu-close');
  //     this.overlay = document.querySelector('.overlay-dark');
  //     this.isOpen = false;
  //     this.closeButton.addEventListener('click', () => this.close());
  //     this.overlay.addEventListener('click', () => this.close());
  //     document.addEventListener('keydown', (event) => {
  //       if (event.key === 'Escape' && this.isOpen) {
  //         this.close();
  //       }
  //     });
  //   }
  
  //   open() {
  //     this.mobileMenu.classList.add('mob--open');
  //     this.overlay.classList.add('overlay--shown');
  //     this.isOpen = true;
  //   }
  
  //   close() {
  //     this.mobileMenu.classList.remove('mob--open');
  //     this.overlay.classList.remove('overlay--shown');
  //     this.isOpen = false;
  //   }

  //   init() {
  //       this.burger.addEventListener('click', () => {
  //           this.open();
  //       })
  //   }
  // }
  
  //   const mobile = new MobileMenu('mobile-menu');

  //   // mobile.init(); 


    class Modal {
      constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeButton = this.modal.querySelector('.modal__close');
        this.modalTrigger = document.querySelectorAll('.modal-trigger');
        this.overlay = document.querySelector('.overlay-dark');
        this.isOpen = false;
        this.closeButton.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && this.isOpen) {
            this.close();
          }
        });
      }
    
      open() {
        this.modal.classList.add('opened-modal');
        this.overlay.classList.add('overlay--shown');
        this.isOpen = true;
      }
    
      close() {
        this.modal.classList.remove('opened-modal');
        this.overlay.classList.remove('overlay--shown');
        this.isOpen = false;
      }

      init() {
        this.modalTrigger.forEach((el) => el.addEventListener('click',() => {
          this.open();
        }))
      }
    }

    const modal = new Modal('modal');

    modal.init()