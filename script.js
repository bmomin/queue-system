const MAX_NUMBER = 90;
const MIN_NUMBER = 1;

const landingView = document.getElementById("landingView");
const numberView = document.getElementById("numberView");
const servingNumber = document.getElementById("servingNumber");
const screen = document.getElementById("screen");
const topBox = document.getElementById("topBox");

let onLandingPage = true;
let currentNumber = MIN_NUMBER;
let fullscreenRequested = false;
let numberTransitionToken = 0;

const DING_AUDIO_PATH = "media/ding.mp3";

function requestFullscreenOnce() {
  if (fullscreenRequested) {
    return;
  }

  fullscreenRequested = true;

  if (document.fullscreenElement) {
    return;
  }

  document.documentElement.requestFullscreen?.().catch(() => {
  });
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {
    });
    return;
  }

  document.documentElement.requestFullscreen?.().catch(() => {
  });
}

function getAudioPath(number) {
  return `media/Now-Serving-Number-${number}.wav`;
}

function playNumberAudio(number) {
  const audio = new Audio(getAudioPath(number));
  return audio.play().catch(() => {
  });
}

function wait(durationMs) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, durationMs);
  });
}

function playDingAudio() {
  const ding = new Audio(DING_AUDIO_PATH);
  return ding.play().catch(() => {
  });
}

async function playCueAndNumberAudio(number) {
  await playDingAudio();
  await wait(120);
  await playNumberAudio(number);
}

async function renderNumber(number) {
  numberTransitionToken += 1;
  const currentToken = numberTransitionToken;

  servingNumber.classList.remove("pulse");
  servingNumber.classList.add("is-updating");
  await wait(120);

  if (currentToken !== numberTransitionToken) {
    return;
  }

  servingNumber.textContent = String(number);
  servingNumber.classList.remove("is-updating");
  servingNumber.classList.add("pulse");

  await playCueAndNumberAudio(number);
}

function showNumberView() {
  onLandingPage = false;
  landingView.classList.add("hidden");
  numberView.classList.remove("hidden");
  topBox.classList.remove("hidden");
  renderNumber(currentNumber);
}

function showLandingView() {
  onLandingPage = true;
  numberView.classList.add("hidden");
  landingView.classList.remove("hidden");
  topBox.classList.add("hidden");
}

function nextSlide() {
  requestFullscreenOnce();

  if (onLandingPage) {
    showNumberView();
    return;
  }

  if (currentNumber >= MAX_NUMBER) {
    return;
  }

  currentNumber += 1;
  renderNumber(currentNumber);
}

function previousSlide() {
  requestFullscreenOnce();

  if (onLandingPage) {
    return;
  }

  if (currentNumber <= MIN_NUMBER) {
    showLandingView();
    return;
  }

  currentNumber -= 1;
  renderNumber(currentNumber);
}

function handleKeyDown(event) {
  if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    toggleFullscreen();
    return;
  }

  const previousKeys = ["ArrowLeft", "ArrowUp", "PageUp", "p", "P", "Backspace"];

  if (previousKeys.includes(event.key)) {
    event.preventDefault();
    previousSlide();
    return;
  }

  const nextKeys = [" ", "Spacebar", "Enter", "ArrowRight", "ArrowDown", "PageDown", "n", "N"];

  if (!nextKeys.includes(event.key)) {
    return;
  }

  event.preventDefault();
  nextSlide();
}

screen.addEventListener("click", nextSlide);
globalThis.addEventListener("keydown", handleKeyDown);
