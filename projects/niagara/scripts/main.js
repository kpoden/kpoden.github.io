

function lang() {
  const switchLang = document.querySelector('.n-lang');
  switchLang.addEventListener('click', () => {
    switchLang.classList.toggle('en');
  })
}

lang();


function prodMenu() {
  const menuItems = document.querySelectorAll('.products-menu__item');

  menuItems.forEach((item)=>{
    
    item.addEventListener('click', (e)=>{
      e = e.target;
      menuItems.forEach((item)=>item.classList.remove('products-menu__item--active'));
      e.classList.add('products-menu__item--active');
    })
  })

}

prodMenu();


function worksCat() {
  const catItems = document.querySelectorAll('.work-form__cat');
  catItems.forEach((item)=>{
    item.addEventListener('click', (e)=>{
      catItems.forEach((item)=>item.classList.remove('work-form__cat--active'));
      e = e.target;
      e.classList.add('work-form__cat--active');
    })
  })
}

worksCat();









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


  //   class Modal {
  //     constructor(modalId) {
  //       this.modal = document.getElementById(modalId);
  //       this.closeButton = this.modal.querySelector('.modal-close');
  //       this.modalTrigger = document.querySelectorAll('.modal-trigger');
  //       this.overlay = document.querySelector('.overlay-dark');
  //       this.isOpen = false;
  //       this.closeButton.addEventListener('click', () => this.close());
  //       this.overlay.addEventListener('click', () => this.close());
  //       document.addEventListener('keydown', (event) => {
  //         if (event.key === 'Escape' && this.isOpen) {
  //           this.close();
  //         }
  //       });
  //     }
    
  //     open() {
  //       this.modal.classList.add('opened-modal');
  //       this.overlay.classList.add('overlay--shown');
  //       this.isOpen = true;
  //     }
    
  //     close() {
  //       this.modal.classList.remove('opened-modal');
  //       this.overlay.classList.remove('overlay--shown');
  //       this.isOpen = false;
  //     }

  //     init() {
  //       this.modalTrigger.forEach((el) => el.addEventListener('click',() => {
  //         this.open();
  //       }))
  //     }
  //   }

  //   const modal = new Modal('modal');

    // modal.init();