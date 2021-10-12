const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
    background-color: #121a24;
    height: 480px;
    width: 720px;
  }
  ::slotted() {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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