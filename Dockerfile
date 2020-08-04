FROM nginx:latest
EXPOSE 8080
ADD src /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf