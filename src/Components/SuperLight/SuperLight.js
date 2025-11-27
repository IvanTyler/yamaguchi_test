

import './SuperLight.scss';

export function SuperLight() {
    const html = document.createElement('section');
    html.classList.add('super-light');
    html.id = "slide-2";

    html.innerHTML = `
        <div class="G-container">
            <img src="/src/assets/img/gradient-3.png" alt="gradient-3" class="super-light__gradient" />
            <div class="content">
                <div class="content__column left">
                    <div class="content__wrapper-text">
                        <span class="content__text">Не тяжелее чашки кофе</span>
                    </div>
                    <img src="/src/assets/img/super-light.png" alt="" class="content__super-light" />
                </div>
                <div class="content__column right">
                    <h2 class="content__title">супер-лёгкий</h2>
                    <p class="content__description">
                        Уменьшает усталость рук <br />  при сушке волос, 
                        делая процедуру <br /> удобной и приятной даже после
                        <br /> напряжённого рабочего дня.
                    </p>
                    <div class="content__bottom-block">
                        500 г
                    </div>
                </div>
            </div>
        </div>
    `;

    return html
}