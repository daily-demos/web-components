const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
    background-color: #1f2d3d;
  }
  </style>
  <slot></slot>
  `;

class DailyCallWindow extends HTMLElement {
  constructor(options = {}) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback() {}
}

window.customElements.define('daily-window', DailyCallWindow);

export default { DailyCallWindow };