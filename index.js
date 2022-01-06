import DailyCallContainer from "./js/daily-call-container.js";
import DailyCallWindow from "./js/daily-call-window.js";
import DailyTray from "./js/daily-tray.js";
import DailyLeaveCall from "./js/daily-call-leave.js";
import DailyToggleMic from "./js/daily-toggle-mic.js";
import DailyToggleCamera from "./js/daily-toggle-camera.js";
import DailyToggleScreen from "./js/daily-toggle-screen.js";

export {
  DailyCallContainer,
  DailyCallWindow,
  DailyTray,
  DailyLeaveCall,
  DailyToggleMic,
  DailyToggleCamera,
  DailyToggleScreen,
};

async function initiateCall() {
  const roomUrl = document.getElementById("roomId").value;
  window.callObject = DailyIframe.createCallObject({ url: roomUrl });
  buildWebComponents();
  await window.callObject.join();
}

function handleJoinError(msg) {
  const errorDiv = document.getElementById("error-msg");
  errorDiv.innerText = `${msg}`;
  document.getElementsByTagName("daily-tray")[0]?.remove();
  document.getElementsByTagName("daily-call")[0]?.remove();
  document.getElementsByTagName("daily-window")[0]?.remove();
}

function clearErrorMsg() {
  const errorDiv = document.getElementById("error-msg");
  if (errorDiv.innerText) {
    errorDiv.innerText = "";
  }
}

function buildWebComponents() {
  const container = document.getElementById("daily-call-container");
  const call = document.createElement("daily-call");
  container.appendChild(call);
  call.appendChild(document.createElement("daily-window"));
  call.appendChild(document.createElement("daily-tray"));
}

const joinButton = document.getElementById("join");

function hideJoinButton() {
  joinButton.disabled = true;
  joinButton.style = "display:none;";
}

async function setupCall() {
  clearErrorMsg();
  initiateCall().then(hideJoinButton).catch(handleJoinError);
}

joinButton.addEventListener("click", (e) => {
  e.preventDefault();
  setupCall();
});

joinButton.addEventListener("submit", (e) => {
  e.preventDefault();
  setupCall();
});
