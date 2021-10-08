import DailyCallContainer from "./js/daily-call-container.js";
import DailyCallWindow from "./js/daily-call-window.js"
import DailyTray from "./js/daily-tray.js"
import DailyLeaveCall from "./js/daily-call-leave.js"
import DailyToggleMic from "./js/daily-toggle-mic.js"
import DailyToggleCamera from "./js/daily-toggle-camera.js"
import DailyToggleScreen from "./js/daily-toggle-screen.js"

export {
  DailyCallContainer,
  DailyCallWindow,
  DailyTray,
  DailyLeaveCall,
  DailyToggleMic,
  DailyToggleCamera,
  DailyToggleScreen
}

function trackStarted(e) {
  const vidsContainer = document.getElementsByTagName('daily-window')[0];
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

let joinButton = document.getElementById('join');

joinButton.addEventListener('click', e => {
  initiateCall()
});
