import './normalize.scss'
import {FenStyler} from "./Components/FenStyler/FenStyler.js";
import {SuperCompact} from "./Components/SuperCompact/SuperCompact.js";
import {SuperLight} from "./Components/SuperLight/SuperLight.js";
import {Motor} from "./Components/Motor/Motor.js";

function initApp() {
    const app = document.getElementById('app')
    
    app.innerHTML = `
        ${FenStyler()}
        ${SuperLight()}
        ${SuperCompact()}
        ${Motor()}
        ${Motor()}

    `;
    
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp)

