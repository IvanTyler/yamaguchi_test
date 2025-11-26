
import './Ions.scss';

export function Ions() {
    const html = document.createElement('section');
    html.classList.add('ions');
    html.id = "5";

    html.innerHTML = `
        <div class="G-container">
            <div class="ion-stats">
                <div class="ion-stats__item">
                    <img src="/src/assets/icons/plus.svg" alt="plus" class="plus-small" />
                    <img src="/src/assets/icons/plus.svg" alt="plus" class="plus-big" />
                
                    <h3 class="ion-stats__title">Миллион</h3>
                    <p class="ion-stats__text">положительных <br /> ионов</p>
                </div>
                
                <div class="ion-stats__item">
                    <img src="/src/assets/icons/minus.svg" alt="plus" class="minus-small-2" />
                    <img src="/src/assets/icons/minus.svg" alt="plus" class="minus-small" />
                    <img src="/src/assets/icons/minus.svg" alt="plus" class="minus-big" />
                    
                    <h3 class="ion-stats__title">2 миллиона</h3>
                    <p class="ion-stats__text">отрицательных <br /> ионов</p>
                </div>
            </div>
            </div>
    `;
    return html;
}