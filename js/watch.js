document.addEventListener("DOMContentLoaded", setupControl, false);
function setupControl() {
  // select the video element from page
  var myVideo = document.getElementById("myVideo");
  if (myVideo.canPlayType) {
    // remove the default buttons
    myVideo.removeAttribute("controls");
    // display the custom buttons and the progress bar
    document.getElementById("controls").style.display = "block";
    document.getElementById("progressbar").style.display = "block";
    // add event-handlers to control the video element
    myVideo.addEventListener("timeupdate", reportProgress, false);
    myVideo.addEventListener("ended", endPlayback, false);
    // enable and disable the controls buttons to reflect the player state
    myVideo.addEventListener(
      "play",
      function () {
        document.getElementById("start").disabled = true;
        document.getElementById("pause").disabled = false;
        document.getElementById("stop").disabled = false;
        document.getElementById("plus").disabled = false;
        document.getElementById("minus").disabled = false;
        document.getElementById("mute").disabled = false;
      },
      false
    );
    myVideo.addEventListener(
      "pause",
      function () {
        document.getElementById("start").disabled = false;
        document.getElementById("pause").disabled = true;
        document.getElementById("plus").disabled = true;
        document.getElementById("minus").disabled = true;
        document.getElementById("mute").disabled = true;
      },
      false
    );
    // add event-handlers for the control buttons
    document
      .getElementById("start")
      .addEventListener("click", startPlayback, false);
    document
      .getElementById("stop")
      .addEventListener("click", stopPlayback, false);
    document
      .getElementById("pause")
      .addEventListener("click", pausePlayback, false);
    document.getElementById("plus").addEventListener("click", volumeUp, false);
    document
      .getElementById("minus")
      .addEventListener("click", volumeDown, false);
    document
      .getElementById("mute")
      .addEventListener("click", toggleMute, false);
  }
}

//define the event-handlers

// if play button is pushed, the media starts playing and the color of the page
//background is changed
function startPlayback() {
  document.getElementById("myVideo").play();
}
// if pause button is pushed, the media play is paused
function pausePlayback() {
  document.getElementById("myVideo").pause();
}
//if stop button is pushed, the media play stops and the current play time is reset to 0
function stopPlayback() {
  var myVideo = document.getElementById("myVideo");
  myVideo.pause();
  myVideo.currentTime = 0;
  endPlayback();
}
//if the plus button is pushed, the sound volume is increased by 10%
function volumeUp() {
  //get the current volume
  var myVideo = document.getElementById("myVideo");
  var volume = Math.floor(myVideo.volume * 10) / 10;
  myVideo.muted = false;
  if (volume >= 0.9) myVideo.volume = 1;
  else myVideo.volume += 0.1;
}
//if the minus button is pushed, the sound volume is decreased by 10%
function volumeDown() {
  //get the current volume
  var myVideo = document.getElementById("myVideo");
  var volume = Math.floor(myVideo.volume * 10) / 10;
  myVideo.muted = false;
  if (volume <= 0.1) myVideo.volume = 0;
  else myVideo.volume -= 0.1;
}
m;

//if the mute button is pushed, the player wilwill toggle between Mute and Unmute state
function toggleMute() {
  var myVideo = document.getElementById("myVideo");
  var mute = document.getElementById("mute");
  if (myVideo.muted) {
    mute.innerHTML = "Mute";
    myVideo.muted = false;
  } else {
    mute.innerHTML = "Unmute";
    myVideo.muted = true;
  }
}
// when the media play is finished or stopped
function endPlayback() {
  // reset the color of page background
  document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
  // reset the progress bar
  var progress = document.getElementById("butterfly");
  progress.style.left = "-10px";
  // reset the state of buttons
  document.getElementById("start").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("stop").disabled = true;
}
// update the progress bar
function reportProgress() {
  var barwidth = 670;
  var sliderwidth = 30;
  // get current time
  var time = Math.round(this.currentTime);
  //get the media play time
  var duration = parseInt(this.duration);
  //calculate the position on the progress bar
  var position = barwidth * (time / duration);
  if (isNaN(position)) return;
  //update the progress bar
  document.getElementById("loadingprogress").style.width = position + "px";
  // update the position of the butterfly
  var butterfly = document.getElementById("butterfly");
  if (position <= barwidth - Math.round(sliderwidth / 2)) {
    butterfly.style.left = position + "px";
  } else {
    butterfly.style.left = barwidth - Math.round(sliderwidth / 2);
  }
}
