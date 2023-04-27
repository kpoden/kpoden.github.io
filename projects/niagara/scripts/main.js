$(document).ready(function(){
  window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
  setTimeout(function(){
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: "body"
        }
    })
  }, 1);
});




class Products {
  constructor(products, modal, id) {
    this.productsData = document.getElementById(products);
    this.modal = document.getElementById(modal);
    this.bg = document.querySelector('.product-modal__header');
    this.productImage = document.querySelector('.prod-display__img img');
    this.switchWrap = document.querySelector('.switch-wrap');
    this.switchWrap.innerHTML = "";
    this.flavoursChooseDiv = document.querySelector('.flavours__choose');
    this.currentVol = '0';
    this.currentProd = id;
    this.subtitleText = document.querySelector('.pm-header__title-sub');
    this.logoImage = document.querySelector('.pm-header__title-main img');
    this.pmStarBlock = document.querySelector('.prod-display__star');
    this.pmStarBlock.classList.add('hidden');
    this.pmTextWrap = document.querySelector('.pm-star__text');
    this.advWrap = document.querySelector('.pm-adv');
    this.secondWindow = document.querySelector('.prod-info');
    this.secondWindow.classList.add('hidden');
    this.secWindowImgElement = document.querySelector('.prod-info__bg');
    this.secWindowTextWrap = document.querySelector('.prod-info__text');
    this.init();
  }

  getProductInfo(productName) {
    this.productName = productName;
    this.products = JSON.parse(this.productsData.innerHTML).products;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (product.name === this.productName) {
        this.product = product;
      }
    }
  }

  createSecondWindow() {
      const srcSet = this.secWindowImgElement.querySelector('source');
      const imgSrc = this.secWindowImgElement.querySelector('.prod-info__img');


    if(this.product.secondWindow) {
      this.secondWindow.classList.remove('hidden');
      console.log(this.product);
      
      srcSet.srcset = this.product.secondWindow[0].imageMob;
      imgSrc.src = this.product.secondWindow[0].image;
      this.secWindowTextWrap.innerHTML = this.product.secondWindow[0].content;

    }
    

  }

  createAdvantages() {
    this.advWrap.innerHTML = "";	
    if (this.product.adv) {
      const advData = this.product.adv;

      advData.forEach(itemData => {
        // Create the elements for the item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('pm-adv__item');
      
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('pm-adv__img');
        const img = document.createElement('img');
        img.src = itemData.icon;
        img.alt = '';
        imgContainer.appendChild(img);
      
        const title = document.createElement('h3');
        title.classList.add('pm-adv__title');
        title.textContent = itemData.title;
      
        const text = document.createElement('p');
        text.classList.add('pm-adv__text');
        text.innerHTML = itemData.text;
      
        // Append the elements to the item container
        itemContainer.appendChild(imgContainer);
        itemContainer.appendChild(title);
        itemContainer.appendChild(text);
      
        // Append the item container to the parent container
        this.advWrap.appendChild(itemContainer);
      });
    }
    
  }



  initMainWindow() {
    this.productImage.src = this.product.volumes[this.currentVol].flavors[0].image;
    this.bg.style.background = this.product.volumes[this.currentVol].flavors[0].bgcolor;
    this.subtitleText.innerHTML = this.product.subtitle;
    this.logoImage.src = this.product.logo;
    this.showNote();
  }

  showNote() {
    if(this.product.note) {
      this.pmStarBlock.classList.remove('hidden');
      this.pmTextWrap.textContent = this.product.note;
    }
  }

  initFlavorsList() {
    
    this.flavoursChooseDiv.innerHTML = "";
    const flavorQuantSpan = document.querySelector('.flavours__quant');
    this.flavorList = [];
    this.product.volumes[this.currentVol].flavors.forEach((flavor) => {
      this.flavorList.push(flavor);
    });

    const flavQuant = this.flavorList.length;
    flavorQuantSpan.innerHTML = flavQuant;


    for (let i = 0; i < this.flavorList.length; i++) {
      const flavor = this.flavorList[i];
    
      const flavoursItemDiv = document.createElement('div');
      flavoursItemDiv.classList.add('flavours__item');
      flavoursItemDiv.dataset.name = flavor.name;

      if(i==0) {
        flavoursItemDiv.classList.add('flavours--active');
      }

      const imgWrap = document.createElement('div');
      imgWrap.classList.add('flavours__img-wrap');

      const imgElem = document.createElement('img');
      imgElem.classList.add('flavours__img');
      imgElem.src = flavor.icon;
      imgElem.alt = flavor.title;

      imgWrap.appendChild(imgElem);
    
      const spanElem = document.createElement('span');
      spanElem.classList.add('flavours__name');
      spanElem.textContent = flavor.title;
    
      flavoursItemDiv.appendChild(imgWrap);
      flavoursItemDiv.appendChild(spanElem);
    
      this.flavoursChooseDiv.appendChild(flavoursItemDiv);

    }

    this.flavours = document.querySelectorAll('.flavours__item');
    this.listenFlavors();


  }

  createSwitch() {

    const prodDisplaySwitch = document.createElement('div');
    prodDisplaySwitch.classList.add('prod-display__switch', 'prod-switch', `vol-quant-${this.volQuantity}`);
    this.switchWrap.appendChild(prodDisplaySwitch);

    const prodSwitchWrap = document.createElement('div');
    prodSwitchWrap.classList.add('prod-switch__wrap');
    prodDisplaySwitch.appendChild(prodSwitchWrap);

    const prodSwitch = document.createElement('span');
    prodSwitch.classList.add('prod-switch__switch');
    prodSwitchWrap.appendChild(prodSwitch);

    const vol1 = document.createElement('div');
    vol1.classList.add('prod-switch__vol');
    prodSwitchWrap.appendChild(vol1);

    const span1 = document.createElement('span');
    span1.textContent = this.sizes[0];
    vol1.appendChild(span1);

    if(this.volQuantity == 2 || this.volQuantity == 3) {
      const vol2 = document.createElement('div');
      vol2.classList.add('prod-switch__vol');
      prodSwitchWrap.appendChild(vol2);

      const span2 = document.createElement('span');
      span2.textContent = this.sizes[1];
      vol2.appendChild(span2);
    }

    if(this.volQuantity == 3) {
      const vol3 = document.createElement('div');
      vol3.classList.add('prod-switch__vol');
      prodSwitchWrap.appendChild(vol3);

      const span3 = document.createElement('span');
      span3.textContent = this.sizes[2];
      vol3.appendChild(span3);
    }

    this.chooseVolIcon = prodDisplaySwitch;
    this.chooseVolSwitch = prodSwitch;



  }

  getVolQuantity() {
    this.sizes = [];
    this.product.volumes.forEach(el=>{
      this.sizes.push(el.size);
    });
    this.volQuantity = this.sizes.length;
  }

  getCurrentFlavor() {

    this.product.volumes[this.currentVol].flavors.forEach((flavor) => {
      if(flavor.name == this.activeFlavour) {
        this.bg.style.background = flavor.bgcolor;
        this.productImage.src = flavor.image;

      }
    });

  }

  addListenerVolume() {

    this.chooseVolIcon.addEventListener('click', this.getVolume.bind(this));
  }

  getVolume() {
    

      if(this.chooseVolIcon.classList.contains('vol-quant-3')) {
        

        if(this.chooseVolSwitch.classList.contains('switched')) {
          this.chooseVolSwitch.classList.remove('switched');
          this.chooseVolSwitch.classList.add('switched2');
          this.chooseVolIcon.setAttribute('data-curr-vol','2');
          this.currentVol = '2';
        } else if(this.chooseVolSwitch.classList.contains('switched2')) {
          this.chooseVolSwitch.classList.remove('switched');
          this.chooseVolSwitch.classList.remove('switched2');
          this.chooseVolIcon.setAttribute('data-curr-vol','0');
          this.currentVol = '0';
        } else {
          this.chooseVolSwitch.classList.add('switched');
          this.chooseVolIcon.setAttribute('data-curr-vol','1');
          this.currentVol = '1';
        }

      }

      if(this.chooseVolIcon.classList.contains('vol-quant-2')) {
        if(this.chooseVolSwitch.classList.contains('switched')) {
          this.chooseVolIcon.setAttribute('data-curr-vol','0');
          this.chooseVolSwitch.classList.remove('switched');
          this.currentVol = '0';
          
        } else {
          this.chooseVolIcon.setAttribute('data-curr-vol','1');
          this.chooseVolSwitch.classList.add('switched');
          this.currentVol = '1';
        }

      }
      this.initFlavorsList();
      this.initMainWindow();
      
     
  }



  listenFlavors() {
    this.activeFlavour = this.flavours[0].getAttribute('data-name');
    this.getCurrentFlavor();
    
    this.flavours.forEach((item) => {
      
      item.addEventListener('click', (e)=>{
        this.flavours.forEach((item) => {
          item.classList.remove('flavours--active');
        });

        this.activeFlavour = e.target.closest('.flavours__item').getAttribute('data-name');
        this.activeFlavorIcon =  e.target.closest('.flavours__item');
        this.activeFlavorIcon.classList.add('flavours--active');

        this.getCurrentFlavor();
        
      })
    })
  }




  changeWindow(id) {
    this.getProductInfo(id);
    this.initMainWindow();
    this.createAdvantages();
    this.createSecondWindow();
    this.getVolQuantity();
    this.createSwitch();
    this.addListenerVolume();
    this.initFlavorsList();
    
  }

  init() {
    
    this.changeWindow(this.currentProd);
  }
}



const productList = document.querySelectorAll('.products-list__item');
const switchWrap = document.querySelector('.switch-wrap');


productList.forEach((item) => {
  item.addEventListener('click', (e) => {
    // switchWrap.innerHTML = "";
    const id = item.getAttribute('id');
    const products = new Products("products", "modal-prod", id);
  });
})




















function productTextAppear() {
  const pmStar = document.querySelector(".pm-star__wrap");
  const pmText = document.querySelector(".pm-star__text");

  pmStar.addEventListener("click", function(e) {
    pmText.classList.toggle("pm-text--showed");

  })
}

productTextAppear()

function scrollFix() {

document.addEventListener("DOMContentLoaded", function(event) {

  var id = '.header,.mission,.history,.work,.news';

  window.addEventListener('load', function() {
    var elements = document.querySelectorAll(id);
    var windowHeight = window.innerHeight;

    elements.forEach(function(element) {
      var elementHeight = element.offsetHeight;
      var topPosition = windowHeight - elementHeight;

      if (element.classList.contains('history')) {
        topPosition = (windowHeight / 2) - elementHeight;
      }

      if (topPosition < 0) {
        element.style.top = topPosition + 'px';
      } else {
        element.style.top = '0';
      }
    });
  });

  window.addEventListener('resize', function() {
    var elements = document.querySelectorAll(id);
    var windowHeight = window.innerHeight;

    elements.forEach(function(element) {
      var elementHeight = element.offsetHeight;
      var topPosition = windowHeight - elementHeight;

      if (element.classList.contains('history')) {
        topPosition = (windowHeight / 2) - elementHeight;
      }

      if (topPosition < 0) {
        element.style.top = topPosition + 'px';
      } else {
        element.style.top = '0';
      }
    });
  });

});

}

scrollFix()


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


function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}


function onePunch() {
  const sectionMission = document.querySelector('.mission');
  const sectionProduct = document.querySelector('.product');
  const sectionGeography = document.querySelector('.geography');
  const sectionNews = document.querySelector('.news');
  const sectionWork = document.querySelector('.work');
  const sectionHistory = document.querySelector('.history');
  const sectionFooter = document.querySelector('.footer');

  sections = [];
  sections.push(sectionMission);
  sections.push(sectionWork);

  sections_half = [];
  sections_half.push(sectionNews);
  sections_half.push(sectionProduct);
  sections_half.push(sectionGeography);
  sections_half.push(sectionHistory);
  sections_half.push(sectionFooter);


  sections_half.forEach(function(section) {
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      if(rect.top < (window.innerHeight || document.documentElement.clientHeight) / 1.1) {
        const topPos = document.documentElement.scrollTop + window.innerHeight/1.1;
        if(!section.classList.contains('scrolled')) {
          gsap.to(window, {
            duration: 1,
            scrollTo: topPos
        })
      
          section.classList.add('scrolled');
        }
      } else {
        section.classList.remove('scrolled');
      }
      

  })

  })

  sections.forEach(function(section) {
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();

      if(isElementInViewport(section)) {

        const topPos = document.documentElement.scrollTop + window.innerHeight;

        
        if(!section.classList.contains('scrolled')) {
          gsap.to(window, {
            duration: 1,
            scrollTo: topPos
        })
      
          section.classList.add('scrolled');
        }
    
    } else {
      section.classList.remove('scrolled');
    }
  })

  })


  }



onePunch()

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


// class Product {
//   constructor(prodId) {
//     this.chooseFlav = document.querySelectorAll('.flavours__item');
    
    


//   }

  

  

// }

// const td = new Product('td');

// td.chooseFlavor();