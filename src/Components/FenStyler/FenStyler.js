
import './FenStyler.scss';

export function FenStyler() {
    return `
        <section class="fen-styler" id="1">
            <div class="G-container">
                <img src="/src/assets/img/gradient-1.png" alt="gradient-1" class="gradient-1" />
                <h2 class="fen-styler__title">
                    ФЕН И СТАЙЛЕР  в уникальном дизайне
                </h2>
                <div class="content">
                    <div class="left">
                        <div class="head-block">Фен</div>
                        <div class="wrapper-image">
                            <img class="image" src="/src/assets/img/fen.png" alt="fen" />
                        </div>
                    </div>
                    <div class="center">
                        <div class="head-block">2 в 1</div>
                        <div class="wrapper-image">
                            <img class="image" src="/src/assets/img/fen-mob.png" alt="fen-mob" />
                        </div>
                    </div>
                    <div class="right">
                        <div class="head-block">Стайлер</div>
                        <div class="wrapper-image">
                            <img class="image" src="/src/assets/img/styler.png" alt="styler" />
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    `;
}