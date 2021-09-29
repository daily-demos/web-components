const template = document.createElement('template');
let bool = true;

function toggle() { bool = !bool; return bool }

template.innerHTML = `
  <style>
    #leave {
        padding: 16px 24px;
        border: 1px solid #1f2d3d;
        border-radius: 8px;
        background-color: #88ee88;
        color: #1f2d3d;
    }
  </style>
  <button id="leave">Toggle your screen</button>
  `;

class DailyToggleScreen extends HTMLElement {
    constructor(options = {}) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = template.content.cloneNode(true);
        this.nativeEl = button.querySelector('button');
        shadow.appendChild(button);
        bool = bool ? false : true;
        this.addEventListener('click', e => {
            (callObject.participants().local.screen ? callObject.stopScreenShare() : callObject.startScreenShare())
        });
    }
}

window.customElements.define('daily-toggle-screen', DailyToggleScreen);

export default { DailyToggleScreen };