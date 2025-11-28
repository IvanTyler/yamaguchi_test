import './MenuNavigation.scss';

export function MenuNavigation() {
    const html = document.createElement('nav');
    html.classList.add('menu-navigation');

    const menuItems = [
        {
            id: 1,
            icon: 'fen',
            active: true
        },
        {
            id: 2,
            icon: 'super-light',
            active: false
        },
        {
            id: 3,
            icon: 'super-compact',
            active: false
        },
        {
            id: 4,
            icon: 'motor',
            active: false
        },
        {
            id: 5,
            icon: 'ions',
            active: false
        }
    ];

    html.innerHTML = `
        <div class="circle">
            <ul class="menu-navigation-list">
                ${menuItems.map((item, index) =>
        `<li class="menu-navigation-list__item ${item.active ? 'active' : ''}" data-index="${index}" id="${item.id}">
                        <i class="icon ${item.icon}"></i>
                    </li>`).join('')}
            </ul>
        </div>
    `;

    const items = html.querySelectorAll('.menu-navigation-list__item');
    const circle = html.querySelector('.circle');

    let isManualSwitch = false;

    document.addEventListener('scroll', function () {
        if (isManualSwitch) return;

        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            const offset = index === slides.length - 1 ? -120 : 0;

            if (slide.getBoundingClientRect().top + offset <= 0 && slide.getBoundingClientRect().bottom >= 0) {
                activateItem(index);
            }
        });
    });

    const centerIndex = Math.floor(menuItems.length / 2);
    activateItem(centerIndex);

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);

            isManualSwitch = true;
            moveToSlide(item.id);
            activateItem(index);

            setTimeout(() => {
                isManualSwitch = false;
            }, 1000);
        });
    });

    function activateItem(activeIndex) {
        items.forEach(item => item.classList.remove('active'));
        items[activeIndex].classList.add('active');

        const totalItems = menuItems.length;
        const startAngle = -40;
        const endAngle = 40;
        const angleStep = (endAngle - startAngle) / (totalItems - 1);

        const currentActiveAngle = startAngle + angleStep * activeIndex;
        const targetRotation = 0 - currentActiveAngle;

        circle.style.transform = `rotate(${targetRotation}deg)`;

        items.forEach((item, index) => {
            const elementAngle = startAngle + angleStep * index;
            const compensation = -targetRotation;
            item.style.transform = `translate(22%, -75%) rotate(${elementAngle}deg) translate(303px) rotate(${compensation}deg)`;
        });
    }

    function moveToSlide(id) {
        const slide = document.querySelector(`#slide-${id}`);
        if (slide) {
            const elementPosition = slide.getBoundingClientRect().top + window.scrollY;
            const offset = id === '5' ? -120 : -30;
            window.scrollTo({
                top: elementPosition + offset,
                behavior: 'smooth'
            });
        }
    }

    setTimeout(() => {
        isManualSwitch = true;
        moveToSlide('3');
        setTimeout(() => {
            isManualSwitch = false;
        }, 1000);
    }, 100);

    return html;
}