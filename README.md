# Daily web components

This demo represents use of Daily's custom [daily-js front end library](https://docs.daily.co/reference/daily-js) and [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) to create an interactive video call that can be added to any website or application.

Check out a live version [here](https://daily-demos.github.io/web-components).

## Requirements

To use this demo, you will first need to [create a Daily account](https://dashboard.daily.co/signup). You will need your Daily API key, which can be found on the [Developers](https://dashboard.daily.co/developers) page, if you want to create new rooms through the demo UI.

You can use existing Daily rooms in the demo by pasting the room URL into the input field. The room URL should be in this format to be valid: `https://domain-name.daily.co/room-name`, with `daily-domain` changed to your domain, and `room-name` changed to the name of the existing room you would like to use.


This demo uses the following Daily methods:
- createCallObject()
- join()
- leave()
- setLocalVideo()
- setLocalAudio()
- startScreenShare()
- stopScreenShare()

This demo uses the following Daily events:
- track-started
- participant-left

