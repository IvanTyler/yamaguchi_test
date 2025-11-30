

import './SuperCompact.scss';

export function SuperCompact() {
    const html = document.createElement('section');
    html.classList.add('super-compact');
    html.classList.add('slide');

    html.id = "slide-3";

    html.innerHTML = `
        <div class="G-container">
            <img src="/assets/img/gradient-2.png" alt="gradient-2" class="gradient" />
            <div class="content">
                <div class="content__column left">
                    <img class="content__fen" src="/assets/img/fen-super-compact.png" alt="fen-super-compact" />
                    <img class="content__packet" src="/assets/img/packet.png" alt="packet" />
                </div>
                <div class="content__column right">
                    <h2 class="content__title">супер- компактный</h2>
                    <p class="content__description">
                        Благодаря складной конструкции — он легко убирается в сумочку и его
                        можно брать в путешествия
                    </p>
                    <div class="content__wrapper-img">
                        <img class="content__image" src="/assets/img/super-compact.png" alt="content__image" />
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}