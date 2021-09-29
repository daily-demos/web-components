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
  <button id="leave">Toggle your audio</button>
  `;

class DailyToggleAudio extends HTMLElement {
    constructor(options = {}) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = template.content.cloneNode(true);
        this.nativeEl = button.querySelector('button');
        shadow.appendChild(button);
        this.addEventListener('click', e => {
            callObject.setLocalAudio(toggle())
        });
        console.log(`Audio is now ${callObject.participants().local.tracks.audio.state}`)
    }
}

window.customElements.define('daily-toggle-audio', DailyToggleAudio);

export default { DailyToggleAudio };