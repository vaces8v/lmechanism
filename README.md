# lmechanism Tilda splash

## Setup in Tilda (Site Settings -> HTML / Head)

1. Remove old splash CSS that sets `overflow: hidden` on `html.lm-splash-pending`
2. Remove old `LOCK` / `lock()` inline script
3. Paste:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@COMMIT/tilda-splash.css">
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@COMMIT/tilda-boot.js"></script>
```

## Fixes
- Splash only on homepage
- No long dark screen on inner pages
- No layout jump after splash: scrollbar gutter stays reserved (`overflow-y: scroll` + `scrollbar-gutter: stable`)
