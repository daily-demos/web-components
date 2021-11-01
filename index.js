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

async function initiateCall() {
  const url = document.getElementById("roomId").value;
  window.callObject = DailyIframe.createCallObject({
    url,
  });

  await callObject.load({ url });
  callObject.join({ url: url });
}

async function buildWebComponents() {
  const container = document.getElementById("daily-call-container");
  const call = document.createElement('daily-call');
  container.appendChild(call);
  call.appendChild(document.createElement('daily-window'));
  call.appendChild(document.createElement('daily-tray'));
}

const joinButton = document.getElementById('join');

joinButton.addEventListener('click', _e => {
  initiateCall();
  buildWebComponents();
});
