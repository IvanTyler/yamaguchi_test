import './MenuNavigation.scss';

// Чтобы добавить пункт — достаточно дописать объект в этот массив.
// Углы, радиус и положение подписей считаются автоматически.
// text — как в макете: \n задаёт перенос строки, label — для скринридера.
// iconSize — размер иконки в обычном состоянии, iconActiveSize — у активного
// пункта. Оба значения взяты из макета.
const DEFAULT_ITEMS = [
  {
    icon: 'fen',
    iconSize: [56, 43],
    iconActiveSize: [78, 60],
    label: 'фен-стайлер 2 в 1',
    text: 'фен-стайлер\n2 в 1',
  },
  {
    icon: 'super-light',
    iconSize: [47, 50],
    iconActiveSize: [66, 70],
    label: 'суперлёгкий',
    text: 'суперлёгкий',
  },
  {
    icon: 'motor',
    iconSize: [54, 54],
    iconActiveSize: [76, 76],
    label: 'инновационный японский мотор',
    text: 'инновационный\nяпонский мотор',
  },
];

const SPREAD_DEG = 45; // сектор колеса: шаг 22.5° — как во фрейме 31810:2024
const RADIUS = 284.5; // осевая линия полосы колеса: (580 - 11) / 2

export function MenuNavigation({
  items: menuItems = DEFAULT_ITEMS,
  spread = SPREAD_DEG,
  radius = RADIUS,
  onNavigate,
  onActive,
} = {}) {
  const nav = document.createElement('nav');
  nav.className = 'menu-navigation';
  nav.setAttribute('aria-label', 'Слайды');

  const count = menuItems.length;
  const step = count > 1 ? spread / (count - 1) : 0;
  const angleOf = (index) => -spread / 2 + step * index;

  const circle = document.createElement('div');
  circle.className = 'circle';

  const list = document.createElement('ul');
  list.className = 'menu-navigation-list';

  const items = menuItems.map((item, index) => {
    const li = document.createElement('li');
    li.className = 'menu-navigation-list__item';
    li.dataset.index = String(index);
    li.style.setProperty('--a', `${angleOf(index)}deg`);
    li.style.setProperty('--r', `${radius}px`);
    if (item.iconSize) {
      li.style.setProperty('--iw', `${item.iconSize[0]}px`);
      li.style.setProperty('--ih', `${item.iconSize[1]}px`);
    }
    if (item.iconActiveSize) {
      li.style.setProperty('--iaw', `${item.iconActiveSize[0]}px`);
      li.style.setProperty('--iah', `${item.iconActiveSize[1]}px`);
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-navigation-list__button';
    button.setAttribute('aria-label', item.label);
    button.innerHTML = `<i class="icon ${item.icon}" aria-hidden="true"></i>`;

    const desc = document.createElement('span');
    desc.className = 'desc';
    desc.setAttribute('aria-hidden', 'true');
    desc.textContent = item.text ?? item.label;

    li.append(button, desc);
    list.append(li);

    return { li, button };
  });

  circle.append(list);
  nav.append(circle);

  let activeIndex = -1;

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    items.forEach(({ li, button }, i) => {
      const isActive = i === index;
      li.classList.toggle('active', isActive);
      if (isActive) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });

    // Колесо проворачивается целиком: активный пункт встаёт в 0°.
    circle.style.setProperty('--rot', `${-angleOf(index)}deg`);

    onActive?.(index);
  }

  function goTo(index) {
    setActive(index);

    if (onNavigate) {
      // Пока идёт программная прокрутка, подслушивать скролл нельзя:
      // иначе по пути 0 → 2 меню успевает дёрнуться на промежуточных слайдах.
      lockMenu();
      onNavigate(index);
      return;
    }

    // Запасной вариант, если скроллом управляет не ScrollTrigger.
    const slide = document.querySelectorAll('.slide')[index];
    slide?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Меню на время программной прокрутки: отпускаем, когда скролл затих,
  // плюс страховочный таймер — если ехать было некуда и событий не будет.
  let menuLocked = false;
  let unlockTimer = 0;
  let idleTimer = 0;

  function lockMenu() {
    menuLocked = true;
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlockMenu, 1500);
  }

  function unlockMenu() {
    menuLocked = false;
    clearTimeout(unlockTimer);
    clearTimeout(idleTimer);
    requestSync();
  }

  // Меню видно только на десктопе (CSS прячет его ≤1200px), поэтому и
  // отслеживание скролла работает там же, где включён GSAP.
  const MENU_FROM = 1200;
  let rafId = 0;

  function syncFromScroll() {
    rafId = 0;
    if (menuLocked) return;
    if (window.innerWidth <= MENU_FROM) return;

    const slides = Array.from(document.querySelectorAll('.slide'));
    if (!slides.length) return;

    // Активен тот слайд, чей центр ближе к центру экрана.
    const middle = window.innerHeight / 2;
    const distances = slides.map((slide) => {
      const rect = slide.getBoundingClientRect();
      return Math.abs(rect.top + rect.height / 2 - middle);
    });

    let closest = 0;
    distances.forEach((distance, i) => {
      if (distance < distances[closest]) closest = i;
    });

    // Гистерезис: на середине пути между слайдами пункт не перескакивает
    // туда-сюда, переключаемся только когда новый заметно ближе.
    if (activeIndex >= 0 && activeIndex !== closest && distances[activeIndex] !== undefined) {
      if (distances[closest] > distances[activeIndex] * 0.8) closest = activeIndex;
    }

    if (closest < count) setActive(closest);
  }

  const requestSync = () => {
    if (!rafId) rafId = requestAnimationFrame(syncFromScroll);
  };

  function onScroll() {
    requestSync();
    if (!menuLocked) return;
    // Скролл ещё идёт — продлеваем ожидание, затихнет на 140 мс — отпускаем.
    clearTimeout(idleTimer);
    idleTimer = setTimeout(unlockMenu, 140);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', requestSync);

  items.forEach(({ button }, index) => {
    button.addEventListener('click', () => goTo(index));
  });

  // Наружу отдаём управление колесом — на случай внешних вызовов.
  nav.setActive = setActive;
  nav.goTo = goTo;
  nav.activeIndex = () => activeIndex;

  setActive(0);
  requestSync();

  return nav;
}
