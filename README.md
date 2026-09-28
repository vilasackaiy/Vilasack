# AIY Food POS - Web Programming Homework

## 1. Mục tiêu
Dự án mô phỏng hệ thống web chạy trên Linux WSL + Docker Compose, gồm Nginx, Node-RED, MariaDB, phpMyAdmin và Cloudflared.

## 2. Thành phần
- `index.html`, `style.css`, `app.js`: Website POS giao diện tiếng Lào.
- `nginx/default.conf`: Nginx phục vụ 2 website và reverse proxy API.
- `nodered/flows.json`: API Node-RED dùng `http in` + `function` + `http response`.
- `db/init/01_init.sql`: CSDL mẫu MariaDB.
- `site2/index.html`: Website thứ hai cho yêu cầu 2 domain.
- `docker-compose.yml`: Toàn bộ môi trường Docker Compose.
- `.env.example`: Mẫu token Cloudflare, không chứa secret thật.

## 3. Cách chạy
Mở PowerShell tại thư mục project và chạy:

```powershell
docker compose up -d
```

Website 1: `http://localhost:8088` hoặc `http://aiy.localhost:8088`
Website 2: `http://demo.localhost:8088`
Node-RED: `http://localhost:1881`
phpMyAdmin: `http://localhost:8090`

## 4. API
Endpoint: `GET /api/tacke?amount=120000`

Ví dụ kết quả:

```json
{"ok":1,"msg":"thành công","amount":120000,"discount":12000,"total":108000,"rate":0.1}
```
## 5. Logic API
- Dưới 50.000đ: không giảm.
- Từ 50.000đ đến dưới 100.000đ: giảm 5%.
- Từ 100.000đ: giảm 10%.
- JavaScript của website gọi API bằng `fetch()` và hiển thị kết quả giảm giá.

## 6. MariaDB
Database: `aiy_food`
User: `aiy`
Password: `aiy123`
Root password: `root123`
Host port trên máy: `3307` (container dùng `3306`).

## 7. Cloudflared
Cloudflared được đặt trong Docker Compose với profile `tunnel` để không làm hỏng bài khi chưa có domain/token.

Khi đã có Cloudflare Tunnel token:

```powershell
Copy-Item .env.example .env
# sửa CLOUDFLARED_TUNNEL_TOKEN trong .env
docker compose --profile tunnel up -d
```

Không commit file `.env` lên GitHub.

## 8. Hai domain
Nginx dùng hai server block:
- `aiy.localhost` -> Website AIY Food POS.
- `demo.localhost` -> Website API Demo.

Khi triển khai bằng domain thật, thay `server_name` bằng hai domain được cấp và cấu hình DNS/Cloudflare Tunnel tương ứng.

## 9. Kiểm tra bài
1. Chụp màn hình WSL đang chạy.
2. Chụp Docker Desktop với 4 service đang chạy.
3. Chụp Website 1.
4. Chụp Website 2.
5. Chụp Node-RED flow có `http in` và `http response`.
6. Chụp kết quả API JSON.
7. Chụp phpMyAdmin và database `aiy_food`.

Các ảnh minh chứng phải là ảnh chụp thật từ máy của sinh viên, không dùng ảnh giả.
