const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 0.5em;
    padding: 0.5em;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #1f2d3d;
  }
  :host > * > button {
    background-color: red !important;
  }
  </style>
  <slot></slot>
  `;

class DailyTray extends HTMLElement {
  constructor(options = {}) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback() {}
}

window.customElements.define('daily-tray', DailyTray);

export default { DailyTray };