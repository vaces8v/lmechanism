# lmechanism — Tilda splash

Splash «Лифтовые Механизмы» для Tilda.

## Важно: тёмный экран на внутренних страницах

В Site Settings был bootstrap, который **сразу** ставил `lm-splash-pending`
(чёрный фон + `visibility: hidden`) на **всех** страницах, а splash-JS
на не-главных больше не запускался → экран висел ~12 сек до emergency unlock.

### Исправление (сделай в Tilda)

1. **Настройки сайта → HTML-код / Head** — замени старый inline bootstrap на:

```html
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@main/tilda-boot.js"></script>
```

CSS splash (`html.lm-splash-pending…`) можно оставить — он без класса ничего не прячет.

2. Убедись, что **старый** скрипт с `lock()` + `cdn.jsdelivr.net/.../tilda-splash.js` **удалён**.

3. Чтобы обойти кеш jsDelivr, лучше pin commit:

```html
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@COMMIT/tilda-boot.js"></script>
```

### Что делает код теперь

- `tilda-boot.js` — lock + загрузка splash **только на главной** (`/`)
- `tilda-splash.js` — если всё же загрузился не на главной, **сразу** снимает lock/overlay
