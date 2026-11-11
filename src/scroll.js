import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Точка остановки слайда: верх секции минус её scroll-margin-top.
// У первого слайда всегда 0 — иначе страница прыгает вниз при загрузке.
function pointFor(slide, index) {
  if (index === 0) return 0;
  const margin = Number.parseFloat(getComputedStyle(slide).scrollMarginTop) || 0;
  return Math.max(0, Math.round(slide.getBoundingClientRect().top + window.scrollY - margin));
}

// Переключение слайдов по скроллу живёт только на десктопе.
// Порог совпадает с тем, где прячется меню (max-width: 1200px),
// потому что переключать без меню нечего.
const DESKTOP_FROM = 1200;

export function initSlideScroll(slides, { desktopFrom = DESKTOP_FROM } = {}) {
  if (!slides.length) return { goTo() {}, refresh() {}, destroy() {} };

  const isDesktop = () => window.innerWidth > desktopFrom;
  let context = null;

  function build() {
    if (context || !isDesktop()) return;

    // gsap.context — чтобы одним revert() снести и твины, и ScrollTrigger,
    // и вернуть инлайновые стили при переходе на адаптив.
    context = gsap.context(() => {
      // 1. Вход слайда: контейнер подъезжает и проявляется.
      //    Активный пункт меню ScrollTrigger не отдаём — он держит старые
      //    позиции после ресайза, меню считает по живым замерам само.
      slides.forEach((slide) => {
        const container = slide.querySelector('.G-container') ?? slide;
        gsap.from(container, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // 2. Снап: после остановки скролла страница доводится до ближайшего слайда.
      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        snap: {
          snapTo: (value) => {
            const max = ScrollTrigger.maxScroll(window) || 1;
            const points = slides.map((slide, index) => pointFor(slide, index) / max);
            let closest = points[0];
            let best = Infinity;
            points.forEach((point) => {
              const distance = Math.abs(point - value);
              if (distance < best) {
                best = distance;
                closest = point;
              }
            });
            return closest;
          },
          duration: { min: 0.25, max: 0.7 },
          delay: 0.08,
          ease: 'power2.inOut',
        },
      });
    });
  }

  function clear() {
    if (!context) return;
    context.revert();
    context = null;
    // Страховка: снимаем остатки инлайновых стилей с контейнеров.
    slides.forEach((slide) => {
      slide.querySelector('.G-container')?.removeAttribute('style');
    });
  }

  function syncMode() {
    if (isDesktop()) {
      build();
      // После сборки пересчитываем позиции: иначе точки снапа какое-то время
      // остаются от прежней раскладки и страница дёргается.
      if (context) ScrollTrigger.refresh();
    } else {
      clear();
    }
  }

  build();
  window.addEventListener('resize', syncMode);

  return {
    goTo(index) {
      if (!context) return;
      const slide = slides[index];
      if (!slide) return;
      window.scrollTo({ top: pointFor(slide, index), behavior: 'smooth' });
    },
    refresh: () => context && ScrollTrigger.refresh(),
    destroy() {
      window.removeEventListener('resize', syncMode);
      clear();
    },
  };
}
