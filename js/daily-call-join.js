const template = document.createElement('template');

template.innerHTML = `
  <style>
    #join {
        padding: 4px 16px;
        border: 1px solid #1bebb9;
        border-radius: 8px;
        background-color: #1bebb9;
        color: #1f2d3d;
        margin-bottom: 2em;
    }
    #join:hover {
        background-color: #1bfdb9 
        cursor: pointer;
    }
  </style>
  <button id="join">Join a call</button>
  `;


function trackStarted(e) {
    const vidsContainer = document.getElementById('videos');
    const audParticipant = document.getElementById(
        `aud${e.participant.user_id}`
    );
    try {
        if (e.track.kind === 'video') {
            let vid = document.getElementById("vid" + e.participant.session_id);
            if (!vid) {
                vid = document.createElement('video');
                vid.session_id = e.participant.session_id;
                vid.autoplay = true;
                vid.muted = true;
                vid.setAttribute('id', 'vid' + e.participant.user_id);
                vidsContainer.appendChild(vid);
            }
            vid.srcObject = new MediaStream([e.track]);
        }
        if (e.track.kind === 'audio') {
            let aud = document.getElementById("aud" + e.participant.session_id);
            if (!aud) {
                if (audParticipant) {
                    audParticipant.remove();
                }
                aud = document.createElement('audio');
                aud.session_id = e.participant.session_id;
                if (e.participant && e.participant.local) {
                    console.log('(audio muted by default)');
                    aud.muted = true;
                } else {
                    aud.autoplay = true;
                }
                aud.setAttribute('id', `aud${e.participant.user_id}`);
                vidsContainer.appendChild(aud);
            }
            aud.srcObject = new MediaStream([e.track]);
        }
    } catch (err) {
        console.log(`Error ${err}`)
    }

}

async function initiateCall() {
    const url = document.getElementById("roomId").value;
    window.callObject = DailyIframe.createCallObject({
        url,
    });

    await callObject.load({
        url
    })

    callObject.on('track-started', trackStarted)
    callObject.join({ url: url });

    callObject.on("participant-left", (e) => {
        console.log(e.participant.user_id);
        document.getElementById("vid" + e.participant.user_id).remove()
    })
}

class DailyJoinCall extends HTMLElement {
    constructor(options = {}) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = template.content.cloneNode(true);
        this.nativeEl = button.querySelector('button');
        shadow.appendChild(button);
        this.addEventListener('click', e => {
            initiateCall()
        });
    }
}

window.customElements.define('daily-call-join', DailyJoinCall);

export default { DailyJoinCall };