import './MenuNavigation.scss';

export function MenuNavigation() {
    const html = document.createElement('nav');
    html.classList.add('menu-navigation');

    const menuItems = [
        {
            icon: 'fen',
            active: true
        },
        {
            icon: 'super-light',
            active: false
        },
        {
            icon: 'super-compact',
            active: false
        },
        {
            icon: 'motor',
            active: false
        },
        {
            icon: 'ions',
            active: false
        }
    ];

    html.innerHTML = `
        <div class="circle">
            <ul class="menu-navigation-list">
                ${menuItems.map((item, index) => {
        return `<li class="menu-navigation-list__item ${item.active ? 'active' : ''}" data-index="${index}">
                        <i class="icon ${item.icon}"></i>
                    </li>`
    }).join('')}
            </ul>
        </div>
    `;

    // Получаем элементы после рендера
    const items = html.querySelectorAll('.menu-navigation-list__item');
    const circle = html.querySelector('.circle');

    // Изначально активируем центральный элемент
    const centerIndex = Math.floor(menuItems.length / 2);
    activateItem(centerIndex);

    // Добавляем обработчики кликов
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            activateItem(index);
        });
    });

    function activateItem(activeIndex) {
        // Сбрасываем активный класс у всех элементов
        items.forEach(item => item.classList.remove('active'));

        // Добавляем активный класс выбранному элементу
        items[activeIndex].classList.add('active');

        // Вычисляем угол вращения для круга
        // Активный элемент должен оказаться на 0° (справа по центру)
        const totalItems = menuItems.length;
        const startAngle = -40; // Начальный угол из SCSS
        const endAngle = 40;    // Конечный угол из SCSS
        const angleStep = (endAngle - startAngle) / (totalItems - 1);

        // Текущий угол активного элемента
        const currentActiveAngle = startAngle + angleStep * activeIndex;

        // Вращаем круг так, чтобы активный элемент оказался на 0°
        const targetRotation = 0 - currentActiveAngle;
        console.log('currentActiveAngle', currentActiveAngle)

        console.log('targetRotation', targetRotation)
        circle.style.transform = `rotate(${targetRotation}deg)`;
    }

    return html;
}