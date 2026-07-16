/**
 * Tilda site-wide bootstrap for LM splash.
 * Locks / shows splash ONLY on the homepage.
 * Keeps scrollbar gutter stable to avoid post-splash layout jump.
 */
(function () {
  var LOCK = "lm-splash-pending";
  var ID = "lm-splash-overlay";
  var MAX = 12000;
  // Updated after each release — pin avoids stale jsDelivr @main cache.
  var JS_URL = "https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@467f8f0c193e0b5a4d9dd2c9acd91936874b88f2/tilda-splash-v2.js";

  function isHomePage() {
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    return p === "/" || p === "/index" || p === "/index.html";
  }

  function scrollbarWidth() {
    return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  }

  function unlock() {
    var root = document.documentElement;
    root.classList.remove(LOCK);
    root.style.background = "";
    root.style.removeProperty("overflow");
    root.style.removeProperty("overflow-y");
    root.style.removeProperty("padding-right");
    root.style.removeProperty("--lm-sbw");
    var b = document.body;
    if (b) {
      b.style.removeProperty("overflow");
      b.style.removeProperty("visibility");
      b.style.removeProperty("padding-right");
      b.style.removeProperty("touch-action");
    }
  }

  function lock() {
    var root = document.documentElement;
    var w = scrollbarWidth();
    root.classList.add(LOCK);
    root.style.setProperty("--lm-sbw", w + "px");
    // Keep page width identical with/without a "real" scrollbar
    root.style.overflowY = "scroll";
    if (w > 0) root.style.paddingRight = "0px";
    var b = document.body;
    if (b) {
      b.style.overflow = "hidden";
      b.style.touchAction = "none";
    }
  }

  function removeStuckOverlay() {
    var o = document.getElementById(ID);
    if (o && o.dataset.lmSplashReady !== "1") {
      o.remove();
      unlock();
    }
  }

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
      '<div class="splash-logo-wrap" aria-label="Liftovye Mekhanizmy"></div>';
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
