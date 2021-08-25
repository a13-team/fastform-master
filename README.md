# Fast-Form

## Installation
Simply run `npm i --production` for deploying build
For building project
```
npm install
npm run build
```
- Move *build* directory and *package.json* to your server
- Run `npm i --production`
- Run daemon via pm2/forever/etc

## Configuration
Rename *.env_example* to *.env*
Change your server's parameters

## Reverse Proxy Setup (NGINX)
Put this config **ABOVE** all *location* rules
```
    # NODE PROXY
    location ~ ^/(myip|app.php) {
        proxy_pass http://127.0.0.1:7050;
    }
```
Follow *.env* config's `PORT`, replace *7050* with yours (if needed)
### Example
```
    set $root_path /var/www/domain.com;
    root $root_path;
    disable_symlinks if_not_owner from=$root_path;
    
    # NODE PROXY
    location ~ ^/(myip|app.php) {
        proxy_pass http://127.0.0.1:7050;
    }

    location / {

        proxy_pass http://127.0.0.1:81;
        proxy_redirect http://127.0.0.1:81/ /;
        include /etc/nginx/proxy_params;
    }


     location ~* ^.+\.(jpg|jpeg|gif|png|svg|js|css|mp3|ogg|mpeg|avi|zip|gz|bz2|rar|swf|ico|7z|doc|docx|map|ogg|otf|pdf|tff|tif|txt|wav|webp|woff|woff2|xls|xlsx|xml)$ {
        try_files $uri $uri/ @fallback;
        expires 7d;

    }

    location @fallback {
        proxy_pass http://127.0.0.1:81;
        proxy_redirect http://127.0.0.1:81/ /;
        include /etc/nginx/proxy_params;
    }
```