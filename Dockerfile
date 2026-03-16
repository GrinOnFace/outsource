# WebCraft landing — статический сайт для GitHub Pages
FROM nginx:alpine

# Копируем статические файлы
COPY index.html styles.css script.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
