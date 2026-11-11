import './normalize.scss';
import './main.scss';

import { FenStyler } from './Components/FenStyler/FenStyler.js';
import { SuperLight } from './Components/SuperLight/SuperLight.js';
import { Motor } from './Components/Motor/Motor.js';
import { MenuNavigation } from './Components/menuNavigation/menuNavigation.js';
import { initSlideScroll } from './scroll.js';

function initApp() {
  const app = document.getElementById('app');

  app.innerHTML = `
        <main class="main"></main>
    `;

  const main = document.querySelector('.main');

  // Слайды добавляем первыми: меню при инициализации ищет их в DOM.
  main.append(FenStyler(), SuperLight(), Motor());

  // Клик по пункту меню просит скролл-контроллер довезти до слайда.
  let scroll;
  const menu = MenuNavigation({
    onNavigate: (index) => scroll?.goTo(index),
  });
  main.append(menu);

  // Скролл-контроллер (GSAP ScrollTrigger): снап по слайдам и анимация входа.
  // Работает только на десктопе, на адаптиве не инициализируется.
  scroll = initSlideScroll(Array.from(main.querySelectorAll('.slide')));
}

document.addEventListener('DOMContentLoaded', initApp);
