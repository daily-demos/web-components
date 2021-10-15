const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      background-color: #121a24;
      overflow: hidden;
    }
    ::slotted(video) {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  </style>
  <slot></slot>
  `;

class DailyCallWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

window.customElements.define('daily-window', DailyCallWindow);

export default { DailyCallWindow };