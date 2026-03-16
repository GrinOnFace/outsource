# WebCraft — лендинг студии веб-разработки

Статический лендинг с тёмной/светлой темой, анимациями и адаптивной вёрсткой.

## Docker

### Сборка и запуск

```bash
# Сборка образа
docker build -t webcraft-landing .

# Запуск (порт 8080)
docker run -p 8080:80 webcraft-landing
```

Сайт будет доступен по адресу: http://localhost:8080

### Docker Compose (опционально)

```bash
docker compose up
```

## GitHub Pages

### Настройка

1. Создайте репозиторий на GitHub и запушьте код
2. В настройках репозитория: **Settings → Pages**
3. В разделе **Build and deployment** выберите:
   - **Source:** GitHub Actions
4. Workflow запустится при пуше в ветку `main`

### Ручной деплой

Вкладка **Actions** → **Deploy to GitHub Pages** → **Run workflow**

### URL сайта

После деплоя сайт будет доступен по адресу:
`https://<username>.github.io/<repo-name>/`

Если репозиторий называется `outsors`, то: `https://username.github.io/outsors/`
