const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      background-color: #121a24;
      overflow: hidden;
      width: inherit;
      height: inherit;
      display: grid;
      grid-template-columns: auto auto;
      align-content: center;
    }
    ::slotted(video) {
      width: 100%;
    }
    ::slotted(audio) {
      display: none;
    }
  </style>
  <slot></slot>
  `;

class DailyCallWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    console.log("<daily-window> has loaded");
  }
}

window.customElements.define('daily-window', DailyCallWindow);

export default { DailyCallWindow };