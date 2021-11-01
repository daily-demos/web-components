const template = document.createElement('template');

template.innerHTML = `
  <slot name="icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <g>
        <path d="M12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3Z" />
        <path d="M7.5 12C7.5 11.5858 7.16421 11.25 6.75 11.25C6.33579 11.25 6 11.5858 6 12C6 13.9175 6.62158 15.4436 7.73826 16.4858C8.67527 17.3603 9.90114 17.8386 11.25 17.9654V20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25V17.9654C14.0989 17.8386 15.3247 17.3603 16.2617 16.4858C17.3784 15.4436 18 13.9175 18 12C18 11.5858 17.6642 11.25 17.25 11.25C16.8358 11.25 16.5 11.5858 16.5 12C16.5 13.5825 15.9966 14.6814 15.2383 15.3892C14.4713 16.105 13.3583 16.5 12 16.5C10.6417 16.5 9.52867 16.105 8.76174 15.3892C8.00342 14.6814 7.5 13.5825 7.5 12Z" />
      </g>
    </svg>
  </slot>
  <slot name="text">Mic</slot>
  `;

const mutedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
  <g>
    <path d="M12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3Z" />
    <path d="M7.5 12C7.5 11.5858 7.16421 11.25 6.75 11.25C6.33579 11.25 6 11.5858 6 12C6 13.9175 6.62158 15.4436 7.73826 16.4858C8.67527 17.3603 9.90114 17.8386 11.25 17.9654V20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25V17.9654C14.0989 17.8386 15.3247 17.3603 16.2617 16.4858C17.3784 15.4436 18 13.9175 18 12C18 11.5858 17.6642 11.25 17.25 11.25C16.8358 11.25 16.5 11.5858 16.5 12C16.5 13.5825 15.9966 14.6814 15.2383 15.3892C14.4713 16.105 13.3583 16.5 12 16.5C10.6417 16.5 9.52867 16.105 8.76174 15.3892C8.00342 14.6814 7.5 13.5825 7.5 12Z" />
  </g>
  </svg>
`;

const unmutedIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<mask id="micIconMaskAudioControls">
<rect x="0" y="0" width="24" height="24" fill="red"></rect>
<path d="M2.88 19L18.88 3" stroke="black" stroke-width="1.5" stroke-linecap="round" style="transform: none; transform-origin: 0px 0px 0px;">
</path>
</mask>
<g mask="url(#micIconMaskAudioControls)">
<path d="M12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3Z">
</path>
<path d="M7.5 12C7.5 11.5858 7.16421 11.25 6.75 11.25C6.33579 11.25 6 11.5858 6 12C6 13.9175 6.62158 15.4436 7.73826 16.4858C8.67527 17.3603 9.90114 17.8386 11.25 17.9654V20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25V17.9654C14.0989 17.8386 15.3247 17.3603 16.2617 16.4858C17.3784 15.4436 18 13.9175 18 12C18 11.5858 17.6642 11.25 17.25 11.25C16.8358 11.25 16.5 11.5858 16.5 12C16.5 13.5825 15.9966 14.6814 15.2383 15.3892C14.4713 16.105 13.3583 16.5 12 16.5C10.6417 16.5 9.52867 16.105 8.76174 15.3892C8.00342 14.6814 7.5 13.5825 7.5 12Z">
</path>
</g>
<path d="M4 20L20 4" stroke="#ffffff" stroke-linecap="round" stroke-width="1.5" style="transform: none; transform-origin: 12px 12px 0px;">
</path>
</svg>
`;

class DailyToggleMic extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    );

    this.addEventListener('click', e => {
      callObject.setLocalAudio(!callObject.localAudio());
      if (callObject.localAudio()) {
        this.shadowRoot.querySelector('slot[name="text"]').textContent = "Unmute"
        this.shadowRoot.querySelector('slot[name="icon"]').innerHTML = unmutedIcon
      } else {
        this.shadowRoot.querySelector('slot[name="text"]').textContent= "Mute";
        this.shadowRoot.querySelector('slot[name="icon"]').innerHTML = mutedIcon;
      }
    });
  }

}

window.customElements.define('daily-toggle-mic', DailyToggleMic);

export default { DailyToggleMic };