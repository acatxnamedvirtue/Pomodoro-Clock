window.breakLength = 5;
window.sessionLength = 25;
window.clockTime = 25*60;
window.clockIsTicking = false;
window.clockType = "Session";
window.clockDisplay = "25:00";

function handleClick(e) {
  e.preventDefault();
  if(window.clockIsTicking) { return; }
  var button = e.currentTarget.id;

  switch(button) {
    case "break-plus":
      window.breakLength++;
      break;
    case "break-minus":
      if(window.breakLength === 1) { break; }
      window.breakLength--;
      break;
    case "session-plus":
      window.sessionLength++;
      break;
    case "session-minus":
      if(window.sessionLength === 1) { break; }
      window.sessionLength--;
      break;
  }

  $('.break-time').text(window.breakLength);
  $('.session-time').text(window.sessionLength);
  window.clockType === "Session" ? window.clockTime = 60 * window.sessionLength : 60 * window.breakLength;
}

function toggleClockTicking() {
  window.clockIsTicking ? window.clockIsTicking = false : window.clockIsTicking = true;

  if(window.clockIsTicking) {
    updateClock();
    window.clockInterval = setInterval(decrementClock, 1000);
  } else {
    window.clearTimeout(window.clockInterval);
  }
}

function toggleClockType() {
  window.clockType === "Session" ? window.clockType = "Break" : window.clockType = "Session";
  window.clockType === "Session" ? window.clockTime = window.sessionLength * 60 : window.clockTime = window.breakLength * 60;
  $('.clock-text').text(window.clockType);

  updateClock();
}

function decrementClock() {
  if(window.clockTime === 0) {
    toggleClockType();
    return;
  }

  window.clockTime--;

  updateClock()
}

function updateClock() {
  var minutes = Math.floor(window.clockTime / 60);
  var seconds = window.clockTime % 60;
  var minutesDisplay = minutes + "";
  var secondsDisplay = seconds + "";

  if(seconds <= 9) { secondsDisplay = "0" + seconds; }
  window.clockDisplay = minutesDisplay + ":" + secondsDisplay;

  updateColorBackground();

  $('.clock-time').text(window.clockDisplay);
}

function updateColorBackground() {
  if(window.clockType === "Session") {
    var ticks = 60-Math.floor((window.clockTime * 60)/(window.sessionLength * 60));
    $('.clock-background').css('background', '#99CC00');
  } else {
    var ticks = 60-Math.floor((window.clockTime * 60)/(window.breakLength * 60));
    $('.clock-background').css('background', 'rgb(255, 68, 68)');
  }

  $('.clock-background').css('top', 32-(5*ticks));
}
