# lmechanism — Tilda splash

Splash «Лифтовые Механизмы» для Tilda.

Скрипт запускается **только на главной** (`/`, `/index`, `/index.html`).
На `/about`, `/services` и других страницах не стартует.

## Подключение в Tilda

```html
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@main/tilda-splash.js"></script>
```

После обновления файла на GitHub jsDelivr может кешировать старую версию.
Если splash всё ещё везде — смени URL на конкретный commit:

```html
<script src="https://cdn.jsdelivr.net/gh/vaces8v/lmechanism@COMMIT_SHA/tilda-splash.js"></script>
```

или purge: `https://purge.jsdelivr.net/gh/vaces8v/lmechanism@main/tilda-splash.js`
