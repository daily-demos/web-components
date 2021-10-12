const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
    background-color: #121a24;
    display: grid;
    grid-template-rows: auto 4.25em;
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