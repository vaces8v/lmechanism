# lmechanism — Tilda splash

Splash only on homepage. Inner pages must not show a dark screen.

## IMPORTANT: change Tilda Site Settings

Updating GitHub is not enough. The live site still embeds the OLD bootstrap that always calls `lock()` on every page.

1. Tilda → Site Settings → More → HTML code (Head)
2. DELETE the old script with `var LOCK="lm-splash-pending"` / `lock();`
3. Paste:

```html
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@main/tilda-boot.js"></script>
```

4. Publish, then hard-refresh `/contacts` (Ctrl+F5)

Keep the CSS for `html.lm-splash-pending` — without the class it does nothing.

## Files

- `tilda-boot.js` — lock + load splash **only on `/`**
- `tilda-splash-v2.js` — animation + safety unlock if loaded on inner pages
- `tilda-splash.js` — same as v2
