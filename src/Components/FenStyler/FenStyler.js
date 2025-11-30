
import './FenStyler.scss';

export function FenStyler() {
    const html = document.createElement('section');
    html.classList.add('fen-styler');
    html.classList.add('slide');

    html.id = "slide-1";

    html.innerHTML = `
        <div class="G-container">
            <img src="/assets/img/gradient-1.png" alt="gradient-1" class="fen-styler__gradient" />
            <h2 class="fen-styler__title">
                ФЕН И СТАЙЛЕР <br />в уникальном дизайне
            </h2>
            <div class="content">
                <div class="content__column left">
                    <span class="content__head-block dark">Фен</span>
                    <div class="content__wrapper-image">
                        <img class="content__image" src="/assets/img/fen.png" alt="fen" />
                    </div>
                </div>
                <div class="content__column center">
                    <span class="content__head-block light">2 в 1</span>
                    <div class="content__wrapper-image">
                        <img class="content__image" src="/assets/img/fen-mob.png" alt="fen-mob" />
                    </div>
                </div>
                <div class="content__column right">
                    <span class="content__head-block light">Стайлер</span>
                    <div class="content__wrapper-image">
                        <img class="content__image" src="/assets/img/styler.png" alt="styler" />
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}