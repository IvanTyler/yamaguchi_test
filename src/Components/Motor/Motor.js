import './Motor.scss';
import { FeatureCard } from '../FeatureCard/FeatureCard.js';

export function Motor() {
  const html = document.createElement('section');
  html.classList.add('section-motor');
  html.classList.add('slide');

  html.id = 'slide-3';
  html.setAttribute('aria-labelledby', 'slide-3-title');

  html.innerHTML = `
        <div class="G-container">
            <h2 class="section-motor__title" id="slide-3-title">
                <span>Для ценителей</span>
                комфорта <br />и качества
                <span>в уходе за волосами</span>
            </h2>

            <div class="section-motor__wrapper-title">
                <h3 class="section-motor__sub-title">Бесщеточный мотор BLDC</h3>
                <picture class="section-motor__picture">
                    <source media="(max-width: 750px)" srcset="/assets/img/motor-mobile.webp">
                    <img src="/assets/img/motor.webp" alt="Бесщеточный мотор BLDC" class="section-motor__img" />
                </picture>
            </div>

            <div class="section-motor__wrapper-text">
                <p class="section-motor__text">Салонная мощность</p>
            </div>
        </div>
    `;

  const content = html.querySelector('.G-container');

  content.prepend(
    FeatureCard(
      'motor',
      'Инновационный <br /> японский мотор',
    ),
  );

  return html;
}
