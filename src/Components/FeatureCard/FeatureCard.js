import './FeatureCard.scss';

export function FeatureCard(iconName, text) {
  const html = document.createElement('div');
  html.classList.add('feature-card');

  html.innerHTML = `
        <div class="feature-card__wrapper-icon" aria-hidden="true">
            <i class="icon ${iconName}"></i>
        </div>

        <p class="feature-card__text">${text}</p>
    `;

  return html;
}
