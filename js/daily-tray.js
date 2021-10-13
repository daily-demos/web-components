const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-gap: 1em;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #1f2d3d;
    }
    ::slotted(*) {
      height: 3.75em;
      width: 3.75em;
      padding: 0.25em;
      background-color: #ffffff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      line-height: 18px;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    ::slotted(*:hover) {
      background-color: #eff3f5;
      cursor: pointer;
    }
  </style>
  <slot></slot>
  `;

class DailyTray extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

window.customElements.define('daily-tray', DailyTray);

export default { DailyTray };