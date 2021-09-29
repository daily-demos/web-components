const template = document.createElement('template');

template.innerHTML = `
  <style>
    #leave {
        padding: 16px 24px;
        border: 1px solid #ee8888;
        border-radius: 8px;
        background-color: #ee8888;
        color: #1f2d3d;
    }
  </style>
  <button id="leave">Leave the call</button>
  `;


class DailyLeaveCall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = template.content.cloneNode(true);
        this.nativeEl = button.querySelector('button');
        shadow.appendChild(button);
        this.addEventListener('click', e => {
            document.getElementById("vid" + callObject.participants().local.user_id).remove();
            document.getElementById("aud" + callObject.participants().local.user_id).remove();
            callObject.leave();
        });
    }
}

window.customElements.define('daily-call-leave', DailyLeaveCall);

export default { DailyLeaveCall };