/**
 * Tilda site-wide bootstrap for LM splash.
 * Put THIS in Site Settings → HTML (instead of the old lock+load snippet).
 * Locks / shows splash ONLY on the homepage.
 */
(function () {
  var LOCK = "lm-splash-pending";
  var ID = "lm-splash-overlay";
  var MAX = 12000;
  // Use v2 filename to bypass stale jsDelivr @main cache of old splash.
  var JS_URL = "https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@32cfbb921f93664598bf07243e311ca290b54a53/tilda-splash-v2.js";

  function isHomePage() {
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    return p === "/" || p === "/index" || p === "/index.html";
  }

  function unlock() {
    document.documentElement.classList.remove(LOCK);
    document.documentElement.style.background = "";
    var b = document.body;
    if (b) {
      b.style.removeProperty("overflow");
      b.style.removeProperty("visibility");
    }
  }

  function removeStuckOverlay() {
    var o = document.getElementById(ID);
    if (o && o.dataset.lmSplashReady !== "1") {
      o.remove();
      unlock();
    }
  }

  // Inner pages: never lock, never load splash.
  if (!isHomePage()) {
    unlock();
    removeStuckOverlay();
    if (!document.body) {
      document.addEventListener(
        "DOMContentLoaded",
        function () {
          unlock();
          removeStuckOverlay();
        },
        { once: true }
      );
    }
    return;
  }

  function lock() {
    document.documentElement.classList.add(LOCK);
    var b = document.body;
    if (b) b.style.overflow = "hidden";
  }

  function ensureShell() {
    if (document.getElementById(ID) || !document.body) return;
    var o = document.createElement("div");
    o.id = ID;
    o.className = "splash-overlay";
    o.setAttribute("role", "presentation");
    o.style.setProperty("--splash-bg", "#000000");
    o.style.setProperty("--splash-color", "#ffffff");
    o.innerHTML =
      '<div class="splash-overlay__bg" aria-hidden="true"></div>' +
      '<div class="splash-logo-wrap" aria-label="Лифтовые Механизмы"></div>';
    document.body.appendChild(o);
  }

  function emergencyUnlock() {
    var o = document.getElementById(ID);
    if (!o) {
      unlock();
      return;
    }
    if (o.dataset.lmSplashReady !== "1") removeStuckOverlay();
  }

  function loadSplash() {
    var s = document.createElement("script");
    s.src = JS_URL;
    s.async = false;
    s.onerror = function () {
      removeStuckOverlay();
    };
    document.head.appendChild(s);
  }

  lock();
  if (document.body) ensureShell();
  else document.addEventListener("DOMContentLoaded", ensureShell, { once: true });
  loadSplash();
  window.setTimeout(emergencyUnlock, MAX);
})();
