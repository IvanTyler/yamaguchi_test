
import './Ions.scss';

export function Ions() {
    return `
        <section class="ions" id="5">
            <div class="G-container">
                <div class="ion-stats">
                    <div class="ion-stats__item">
                        <img src="/src/assets/icons/plus.svg" alt="plus" class="plus-small" />
                        <img src="/src/assets/icons/plus.svg" alt="plus" class="plus-big" />
                    
                        <h3 class="title">Миллион</h3>
                        <p class="text">положительных ионов</p>
                    </div>
                    
                    <div class="ion-stats__item">
                        <img src="/src/assets/icons/minus.svg" alt="plus" class="minus-small-2" />
                        <img src="/src/assets/icons/minus.svg" alt="plus" class="minus-small" />
                        <img src="/src/assets/icons/minus.svg" alt="plus" class="minus-big" />
                        
                        <h3 class="title">2 миллиона</h3>
                        <p class="text">отрицательных ионов</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}