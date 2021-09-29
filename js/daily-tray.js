const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #1f2d3d;
    border: 1px solid #1f2d3d;
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