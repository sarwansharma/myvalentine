/* =====================================================
   CONTINUOUS BACKGROUND MUSIC (CROSS-PAGE)
===================================================== */

let music = null;

window.addEventListener("DOMContentLoaded", () => {
  music = document.getElementById("bg-music");
  if (!music) return;

  music.loop = true;
  music.volume = 0.35;

  /* Restore last playback time */
  const savedTime = sessionStorage.getItem("musicTime");
  if (savedTime) {
    try {
      music.currentTime = parseFloat(savedTime);
    } catch (e) {}
  }

  /* Try autoplay muted (browser-safe) */
  music.muted = true;
  music.play().then(() => {
    music.muted = false;
  }).catch(() => {
    /* Fallback: play on first user click */
    document.addEventListener(
      "click",
      () => {
        music.muted = false;
        music.play().catch(() => {});
      },
      { once: true }
    );
  });

  /* Save playback position every second */
  setInterval(() => {
    if (!music.paused && !music.ended) {
      sessionStorage.setItem("musicTime", music.currentTime.toString());
    }
  }, 1000);
});

/* =====================================================
   PAGE FLOW LOGIC (UNCHANGED)
===================================================== */

function resetFlow() {
  sessionStorage.removeItem("noStep");
}

function noClickFromIndex() {
  sessionStorage.setItem("noStep", "1");
  window.location.href = "no1.html";
}

function yesClickEarly(msgId) {
  const msg = document.getElementById(msgId);
  if (!msg) return;

  msg.style.opacity = "1";
  setTimeout(() => {
    msg.style.opacity = "0";
  }, 2000);
}

function continueNoFlow() {
  let step = parseInt(sessionStorage.getItem("noStep"), 10);

  if (!step || step < 1 || step >= 6) {
    window.location.href = "index.html";
    return;
  }

  step++;
  sessionStorage.setItem("noStep", step.toString());
  window.location.href = `no${step}.html`;
}

function finalYes() {
  if (sessionStorage.getItem("noStep") !== "6") {
    window.location.href = "index.html";
    return;
  }

  resetFlow();
  window.location.href = "yes.html";
}
