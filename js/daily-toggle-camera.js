const template = document.createElement('template');

template.innerHTML = `
  <style>
  </style>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <g>
        <path d="M5 7.5C3.89543 7.5 3 8.39543 3 9.5V14.5C3 15.6046 3.89543 16.5 5 16.5H13C14.1046 16.5 15 15.6046 15 14.5V9.5C15 8.39543 14.1046 7.5 13 7.5H5Z" />
        <path d="M16.5 10.9491C16.5 10.6634 16.6221 10.3914 16.8356 10.2017L19.3356 7.97943C19.9805 7.40618 21 7.86399 21 8.72684V15.2732C21 16.136 19.9805 16.5938 19.3356 16.0206L16.8356 13.7983C16.6221 13.6086 16.5 13.3366 16.5 13.0509V10.9491Z" />
      </g>
    </svg>
    <slot>Turn off</slot>
  `;

class DailyToggleCamera extends HTMLButtonElement {

  static get observedAttributes() { return ['muted']; }

  get muted() {
    return this.hasAttribute('muted');  
  }

  set muted(val) {
    val ? this.setAttribute('muted','') : this.removeAttribute('muted');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    );
    this.addEventListener('click', e => {
      callObject.setLocalVideo(this.muted);
      this.muted ? this.textContent = "Turn off" : this.textContent = "Turn on";
      this.muted = !this.muted;
    });
    this.addEventListener('slotchange', event => console.log(event));
  }
}

window.customElements.define('daily-toggle-camera', DailyToggleCamera, { extends: 'button' });

export default { DailyToggleCamera };