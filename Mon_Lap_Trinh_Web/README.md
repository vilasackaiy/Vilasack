# MÔN LẬP TRÌNH WEB

## Bài tập 1

WSL2 + Docker Compose + Nginx + Node-RED + MariaDB + phpMyAdmin + Cloudflared.

Nginx phục vụ hai website:

- `site1.localhost:8088` → Website 1 + gọi API.
- `site2.localhost:8088` → Website 2.

## Bài tập 2

Luồng Node-RED:

`http in → function → http response`

API: `GET /api/tacke?amount=120000`

Nginx reverse proxy:

`/api/` → `http://nodered:1880/api/`

JavaScript trong Website 1 dùng `fetch('/api/tacke?...')` để gọi API.

## Chạy

```bash
docker compose up -d
docker compose ps
```

## Kiểm tra

- Website 1: http://site1.localhost:8088
- Website 2: http://site2.localhost:8088
- Node-RED: http://localhost:1881
- phpMyAdmin: http://localhost:8090
- API: http://localhost:1881/api/tacke?amount=120000

## Cloudflared

Tạo `.env` từ `.env.example`, điền Tunnel Token thật rồi chạy:

```bash
docker compose --profile tunnel up -d
```

Cần domain thật được cấu hình trên Cloudflare để có URL public.
