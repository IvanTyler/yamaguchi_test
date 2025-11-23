import './normalize.scss';
import './main.scss';

import {FenStyler} from "./Components/FenStyler/FenStyler.js";
import {SuperCompact} from "./Components/SuperCompact/SuperCompact.js";
import {SuperLight} from "./Components/SuperLight/SuperLight.js";
import {Motor} from "./Components/Motor/Motor.js";
import {Ions} from "./Components/Ions/Ions.js";

function initApp() {
    const app = document.getElementById('app')
    
    app.innerHTML = `
        <main class="main">
            ${FenStyler()}
            ${SuperLight()}
            ${SuperCompact()}
            ${Motor()}
            ${Ions()}
        </main>
    `;
    
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp)

