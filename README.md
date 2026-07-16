# lmechanism Tilda splash

## Setup in Tilda (Site Settings -> HTML / Head)

1. Remove old splash CSS with html.lm-splash-pending + overflow: hidden
2. Remove old LOCK / lock() inline script
3. Paste:

`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@467f8f0c193e0b5a4d9dd2c9acd91936874b88f2/tilda-splash.css">
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@467f8f0c193e0b5a4d9dd2c9acd91936874b88f2/tilda-boot.js"></script>
`

4. Publish + Ctrl+F5

## What this fixes
- Splash only on homepage
- No dark screen on /contacts etc.
- No page jump after splash (scrollbar always reserved)
