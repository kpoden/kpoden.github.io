$(document).ready(function(){
  setTimeout(function(){
      window.scrollTo(0, 0);
  }, 1);
});


function smoothScroll() {


const nBlocks = document.querySelectorAll('.n-block');


window.addEventListener('scroll', () => {

  for (let i = 0; i < nBlocks.length; i++) {

      const rect = nBlocks[i].getBoundingClientRect();


      if (rect.top >= 0) {

        const scrollPos = rect.top - window.innerHeight + rect.height;

        window.scrollTo({
          top: scrollPos,
          behavior: 'smooth'
        });
      }
    }
  });
}

// smoothScroll()


function scrollUpAppear() {
  window.addEventListener('scroll', function() {
    var element = document.getElementById('scroll-up');
    if (window.scrollY > 500) {
      element.classList.add('scroll-up__appear');
    } else {
      element.classList.remove('scroll-up__appear');
    }
  });
}

scrollUpAppear();


function orderDisappear() {
  const order = document.querySelector('.order');
  window.addEventListener('scroll', () => {
    if(order.getBoundingClientRect().top < 100) {
      order.classList.add('unvisOrder');
    } else {
      order.classList.remove('unvisOrder');
    }
  })
}
orderDisappear()


function parallex() {
  const ypos = window.pageYOffset;
  const header = $('.header').height();    
  if(ypos-header>135){
      $('.header').css({'opacity':0})
  }else{
      $('.header').css({'opacity':1})
  }
  }
  window.addEventListener('scroll', parallex), false;



function fixBlocks(){
  function parallex() {
      ypos = window.pageYOffset;
      const header = document.querySelector('.header');
      const product = document.querySelector('.product');
      const history = document.querySelector('.history');
      const geography = document.querySelector('.geography');
      const work = document.querySelector('.work');
      const news = document.querySelector('.news');
      const footer = document.querySelector('.footer');
  
      if(ypos>0 && ypos<900){
       var top = 0 - ypos;
       header.style.position = 'fixed';
       header.style.padding = '55px 65px 55px';
       product.style.top = '876px';
      }
      if(ypos>900){
       header.style.position = 'relative';
       product.style.top = '0';
      }
      if(ypos>4916){
       var top = (4916 - ypos)*.5;
       var top1 = -4916 + ypos;
       history.style.position = 'relative';
       history.style.top = top1+'px';
       geography.style.top = top+'px';
       geography.style.marginBottom = top+'px';
       geography.style.position = 'relative';
  
      }
      if(ypos>5784){
       history.style.top = 'auto';
      }
      if(ypos>6545){
       geography.style.top = '-814px';
       geography.style.marginBottom = '-814px';
      }
      if(ypos>6580){
       var top = 6580 - ypos;
       var top1 = -6580 + ypos;
       if(344 < top1){
          var top1 = 344;
       }
  
       work.style.position = 'relative';
       work.style.top = top1+'px';
       news.style.top = top+'px';
       news.style.marginBottom = top+'px';
       news.style.position = 'relative';
      }
      if(ypos>7030){
       var top = 7030 - ypos;
       var top1 = (-7030 + ypos)-450;
       if(-100 < top1){
          var top1 = -100;
          var mar = -800;
          news.style.marginBottom = mar+'px';
       }
       news.style.top = top1+'px';
       footer.style.top = top+'px';
       footer.style.marginBottom = top+'px';
       footer.style.position = 'relative';
  
      }
  
  
  }
  window.addEventListener('scroll', parallex), false;
  }
  // fixBlocks()



function sectionsFix() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const allSections = document.querySelectorAll('.n-block');

  for (let i = 0; i < 2; i++) {
    const section = allSections[i];

    section.classList.add('unfixed');
    section.style.top = (viewportHeight) + 'px';

    document.addEventListener('scroll', () => {
      console.log(section.getBoundingClientRect().top);
      if (section.getBoundingClientRect().top < 5) {
        
        section.classList.add('fixedBlock');
        section.style.top = '0px';
      } else {
        section.classList.remove('fixedBlock');
      }

    
  })
}
}


// sectionsFix()





function scrollBlocks() {

  const yearNum = document.querySelector('.year__num');
  const scrollBlocks = document.querySelectorAll('.events__item');
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;


  for (let index = 0; index < scrollBlocks.length; index++) {

    const block = scrollBlocks[index];
    block.classList.add('hiddenBlock');

    document.addEventListener('scroll', () => {

      if (block.getBoundingClientRect().top - 100 < (viewportHeight / 2) + 150) {
        block.classList.remove('hiddenBlock');
        block.classList.add('visibleBlock');
      } else {
        block.classList.add('hiddenBlock');
        block.classList.remove('visibleBlock');
      }

      const visBlocks = document.querySelectorAll('.visibleBlock');
      if(visBlocks.length > 0) {
        let yearNew = parseFloat(visBlocks[visBlocks.length - 1].dataset.year);
        let yearOld = parseFloat(yearNum.innerText);
        yearNum.innerText = yearNew;

      }
      
    })

  }

}

scrollBlocks();






function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
      counters();
    }
  });
}
let options = { threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
  observer.observe(elm);
}


function counters() {
  const counters = document.querySelectorAll( '.counter' );
	
    jQuery(function ($) {
        "use strict";
      
        var counterUp = window.counterUp["default"];
      
      
        counters.forEach((counter=>{
          counterUp( counter, {
            duration: 1000,
            delay: 5,
        } )
        }))
       
  
    });

//   const counters = document.querySelectorAll('.mission-adv__top-text');

//   counters.forEach((counter)=> {
//       counter.innerText = 0;
//       let count = 0;

//       function updateCount() {
//         const target = parseFloat(counter.dataset.count);

//         if(count < target) {
//           count++;
//           counter.innerText = count;
//           const duration = 4000/target;
//           setTimeout(updateCount, duration);
//         } else {
//           counter.innerText = target;
//         }

//     }

//     updateCount();

//   })

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

// videoAppear();




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

document.getElementById("scroll-up").addEventListener("click", () => {
  console.log('su');
  gsap.to(window, {
      duration: 1,
      scrollTo: {
          y: "body"
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
      constructor(modalId, trigger) {
        this.modal = document.getElementById(modalId);
        this.closeButton = this.modal.querySelector('.modal__close');
        this.modalTrigger = document.querySelectorAll(trigger);
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

    const modalNews = new Modal('modal-news', '.modal-trigger');

    modalNews.init();

    const modalProd = new Modal('modal-prod', '.modal-trigger-prod');

    modalProd.init();


class Product {
  constructor(prodId) {
    this.chooseFlav = document.querySelectorAll('.flavours__item');
    this.chooseVolIcon = document.querySelector('.prod-switch');
    this.chooseVolSwitch = document.querySelector('.prod-switch__switch');


  }

  chooseFlavor() {
    this.chooseFlav.forEach((el) =>
      el.addEventListener('click', () => {
        this.chooseFlav.forEach(el => el.classList.remove('flavours--active'));
        el.classList.add('flavours--active')
      }
      )
    )
  }

  chooseVol() {
    this.chooseVolIcon.addEventListener('click', () => {
      this.chooseVolSwitch.classList.toggle('switched');
    })
  }

}

const td = new Product('td');

td.chooseFlavor();
td.chooseVol();