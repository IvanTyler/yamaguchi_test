import './SuperLight.scss';
import { FeatureCard } from '../FeatureCard/FeatureCard.js';

export function SuperLight() {
  const html = document.createElement('section');
  html.classList.add('super-light');
  html.classList.add('slide');

  html.id = 'slide-2';
  html.setAttribute('aria-labelledby', 'slide-2-title');

  html.innerHTML = `
        <div class="G-container">
            <span class="super-light__gradient" aria-hidden="true"></span>
            <div class="content">
                <div class="content__wrapper-text">
                    <p class="content__text">Не тяжелее чашки кофе</p>
                </div>

                <picture class="content__picture">
                    <source class="content__super-light" media="(max-width: 750px)" srcset="/assets/img/super-light-mobile.webp">
                    <img src="/assets/img/super-light.webp" alt="Суперлёгкий фен-стайлер YAMAGUCHI" class="content__super-light" />
                </picture>

                <h2 class="content__title" id="slide-2-title">супер-лёгкий</h2>
                <p class="content__title-mob" aria-hidden="true">суперлёгкий</p>

                <p class="content__description">
                    Уменьшает усталость рук <br />  при сушке волос, 
                    делая процедуру <br /> удобной и приятной даже после
                    <br /> напряжённого рабочего дня.
                </p>

                <p class="content__weight">500 г</p>
            </div>
        </div>
    `;

  const content = html.querySelector('.content');

  content.append(
    FeatureCard('super-light', 'лёгкость <br /> и комфорт <br /> в руке'),
  );

  return html;
}
