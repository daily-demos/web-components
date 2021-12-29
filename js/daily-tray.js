const template = document.createElement("template");

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
    daily-toggle-camera, daily-toggle-mic, daily-toggle-screen, daily-leave {
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
    :host > *:hover {
      background-color: #eff3f5;
      cursor: pointer;
    }
  </style>
  <daily-toggle-camera>Camera</daily-toggle-camera>
  <daily-toggle-mic>Mic</daily-toggle-mic>
  <daily-toggle-screen></daily-toggle-screen>
  <daily-leave></daily-leave> 
  `;

class DailyTray extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }
  connectedCallback() {}
}

window.customElements.define("daily-tray", DailyTray);

export default { DailyTray };
