const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
      display: grid;
      background-color: #1f2d3d;
  }
  </style>
  <slot></slot>
  `;

class DailyCallContainer extends HTMLElement {
    constructor(options = {}) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    connectedCallback() {}
}

window.customElements.define('daily-call', DailyCallContainer);

export default { DailyCallContainer };