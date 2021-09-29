const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
      display: grid;
      background-color: #1f2d3d;
      grid-gap: 0.5em;
      grid-template-columns: repeat(5, 1fr);
      padding: 4em 0em 4em 0em;
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