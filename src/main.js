import './normalize.scss';
import './main.scss';

import {FenStyler} from "./Components/FenStyler/FenStyler.js";
import {SuperCompact} from "./Components/SuperCompact/SuperCompact.js";
import {SuperLight} from "./Components/SuperLight/SuperLight.js";
import {Motor} from "./Components/Motor/Motor.js";
import {Ions} from "./Components/Ions/Ions.js";
import {MenuNavigation} from "./Components/menuNavigation/menuNavigation.js";

function initApp() {
    const app = document.getElementById('app');



    app.innerHTML = `
        <main class="main"> 
        </main>
    `;

    const main = document.querySelector('.main');
    main.append(MenuNavigation())
    main.append(FenStyler())
    main.append(SuperLight())
    main.append(SuperCompact())
    main.append(Motor())
    main.append(Ions())

    const slides = document.querySelectorAll('.slide');


}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp)

