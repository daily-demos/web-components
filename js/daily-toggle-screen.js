const template = document.createElement("template");

template.innerHTML = `
  <style>
  </style>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M17 4.5H7C5.61929 4.5 4.5 5.61929 4.5 7V14C4.5 15.3807 5.61929 16.5 7 16.5H17C18.3807 16.5 19.5 15.3807 19.5 14V7C19.5 5.61929 18.3807 4.5 17 4.5ZM6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V14C18 14.5523 17.5523 15 17 15H7C6.44772 15 6 14.5523 6 14V7ZM8 18C7.58579 18 7.25 18.3358 7.25 18.75C7.25 19.1642 7.58579 19.5 8 19.5H16C16.4142 19.5 16.75 19.1642 16.75 18.75C16.75 18.3358 16.4142 18 16 18H8Z"/></svg>
    <slot>Screen</slot>
  `;

class DailyToggleScreen extends HTMLElement {
  static get observedAttributes() {
    return ["sharing"];
  }

  get sharing() {
    return this.hasAttribute("sharing");
  }

  set sharing(val) {
    val ? this.setAttribute("sharing", "") : this.removeAttribute("sharing");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
    this.addEventListener("click", (e) => {
      callObject.participants().local.screen
        ? callObject.stopScreenShare()
        : callObject.startScreenShare();
      this.sharing ? (this.textContent = "Share") : (this.textContent = "Stop");
      this.sharing = !this.sharing;
      // when sharing stops, make sure to show camera again (if on)
      if (!this.sharing && callObject.localVideo()) {
        const localVid = document.getElementById(
          `vid-${callObject.participants().local.session_id}`
        );
        localVid.srcObject = new MediaStream([
          callObject.participants().local.tracks.video.track,
        ]);
      }
    });
  }
}

window.customElements.define("daily-toggle-screen", DailyToggleScreen);

export default { DailyToggleScreen };
