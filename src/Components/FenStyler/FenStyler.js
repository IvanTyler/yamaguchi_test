import './FenStyler.scss';

export function FenStyler() {
  const html = document.createElement('section');
  html.classList.add('fen-styler');
  html.classList.add('slide');

  html.id = 'slide-1';
  html.setAttribute('aria-labelledby', 'slide-1-title');

  html.innerHTML = `
        <div class="G-container">
            <span class="fen-styler__gradient" aria-hidden="true"></span>
            <h1 class="fen-styler__title" id="slide-1-title">
                ФЕН И СТАЙЛЕР <br />в уникальном дизайне
            </h1>
            <div class="content">
                <div class="content__column left">
                    <p class="content__head-block dark">Фен</p>
                    <div class="content__wrapper-image">
                        <img class="content__image" src="/assets/img/fen.webp" alt="Фен YAMAGUCHI" />
                    </div>
                </div>
                <div class="content__column center">
                    <p class="content__head-block light">2 в 1</p>
                    <div class="content__wrapper-image">
                        <picture class="content__picture">
                            <source media="(max-width: 500px)" srcset="/assets/img/fen-mob.webp">
                            <img class="content__image" src="/assets/img/fen-desc.webp" alt="Фен-стайлер YAMAGUCHI 2 в 1" />
                        </picture>
                    </div>
                </div>
                <div class="content__column right">
                    <p class="content__head-block light">Стайлер</p>
                    <div class="content__wrapper-image">
                        <img class="content__image" src="/assets/img/styler.webp" alt="Стайлер YAMAGUCHI" />
                    </div>
                </div>
            </div>
        </div>
    `;

  return html;
}
