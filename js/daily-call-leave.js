const template = document.createElement('template');

template.innerHTML = `
  <style>
  </style>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f63135" fillRule="evenodd" clipRule="evenodd" d="M4.5 7C4.5 5.89543 5.39543 5 6.5 5H14.5C15.6046 5 16.5 5.89543 16.5 7V10H14.5V8C14.5 7.44772 14.0523 7 13.5 7H7.5C6.94772 7 6.5 7.44772 6.5 8V16C6.5 16.5523 6.94772 17 7.5 17H13.5C14.0523 17 14.5 16.5523 14.5 16V14H16.5V17C16.5 18.1046 15.6046 19 14.5 19H6.5C5.39543 19 4.5 18.1046 4.5 17V7ZM11.5 12C11.5 11.4477 11.9477 11 12.5 11H19.8474L18.159 9.38203C17.7997 9.03763 17.7996 8.46321 18.1589 8.11871L18.1987 8.08052C18.5371 7.75601 19.0712 7.75594 19.4097 8.08035L22.7466 11.2782C23.1574 11.6718 23.1574 12.3285 22.7465 12.7222L19.4096 15.9198C19.0711 16.2441 18.5371 16.2441 18.1987 15.9197L18.159 15.8816C17.7997 15.5372 17.7997 14.9627 18.1591 14.6182L19.8477 13H12.5C11.9477 13 11.5 12.5523 11.5 12Z"/></svg>
    <span>Leave</span>
  `;


class DailyLeaveCall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    );
    this.addEventListener('click', e => {
      document.getElementById("vid" + callObject.participants().local.user_id).remove();
      document.getElementById("aud" + callObject.participants().local.user_id).remove();
      callObject.leave();
    });
  }
}

window.customElements.define('daily-leave', DailyLeaveCall);

export default { DailyLeaveCall };