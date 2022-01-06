const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      background-color: #121a24;
      display: grid;
      grid-template-rows: auto 4.25em;
      width: inherit;
      height: inherit;
    }
  </style>
  <slot></slot>
  `;

class DailyCallContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    callObject.on("error", raiseError);

    callObject.on("track-started", trackStarted);

    callObject.on("participant-left", (e) => {
      document.getElementById("vid-" + e.participant.user_id).remove();
    });
  }

  connectedCallback() {
    console.log("<daily-call> added to page");
  }

  disconnectedCallback() {
    console.log("<daily-call> removed from the page");
  }
}

function raiseError(msg) {
  const errorDiv = document.getElementById("error-msg");
  errorDiv.innerText = `Problem during the call -- ${msg}`;
}

function trackStarted(e) {
  const vidsContainer = document.getElementsByTagName("daily-window")[0];
  const audParticipant = document.getElementById(
    `aud-${e.participant.user_id}`
  );
  try {
    if (e.track.kind === "video") {
      let vid = document.getElementById(`vid-${e.participant.session_id}`);
      if (!vid) {
        vid = document.createElement("video");
        vid.session_id = e.participant.session_id;
        vid.autoplay = true;
        vid.muted = true;
        vid.setAttribute("id", "vid-" + e.participant.user_id);
        vidsContainer.appendChild(vid);
      }
      vid.srcObject = new MediaStream([e.track]);
    }
    if (e.track.kind === "audio") {
      let aud = document.getElementById(`aud-${e.participant.session_id}`);
      if (!aud) {
        if (audParticipant) {
          audParticipant.remove();
        }
        aud = document.createElement("audio");
        aud.session_id = e.participant.session_id;
        if (e.participant && e.participant.local) {
          aud.muted = true;
        } else {
          aud.autoplay = true;
        }
        aud.setAttribute("id", `aud-${e.participant.user_id}`);
        vidsContainer.appendChild(aud);
      }
      aud.srcObject = new MediaStream([e.track]);
    }
  } catch (error) {
    raiseError(error);
  }
}

window.customElements.define("daily-call", DailyCallContainer);

export default { DailyCallContainer };
