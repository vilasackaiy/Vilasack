# BÀI TẬP VỀ NHÀ - 2 MÔN

## Thông tin

- Sinh viên: **Vilasack**


## 1. Môn An toàn và Bảo mật Thông tin

Thư mục: `Mon_An_Toan_Bao_Mat_Thong_Tin/`

Đã thực hiện các nội dung: DES, AES, RSA, các mô hình áp dụng RSA, so sánh AES/RSA và mô hình mã hóa lai RSA + AES.

- `Bao_cao_DES_AES_RSA.md`: báo cáo lý thuyết.
- `Code_AES/aes_demo.py`: chương trình AES-128-CBC bằng Python.
- `requirements.txt`: thư viện PyCryptodome.
- `images/`: nơi lưu ảnh minh chứng nếu cần.

### Chạy chương trình AES

```bash
cd Mon_An_Toan_Bao_Mat_Thong_Tin
pip install -r requirements.txt
python Code_AES/aes_demo.py
```

## 2. Môn Lập trình Web

Thư mục: `Mon_Lap_Trinh_Web/`

### Bài tập 1

- Giả lập Linux OS bằng **WSL2**.
- Docker Compose.
- Nginx.
- Node-RED.
- MariaDB.
- phpMyAdmin.
- Cloudflared (cần domain và Tunnel Token thật).
- Nginx chạy 2 website với 2 hostname khác nhau.

### Bài tập 2

- Node-RED dùng `http in` + `function` + `http response`.
- API: `GET /api/tacke`.
- Nginx reverse proxy `/api/` tới Node-RED.
- JavaScript dùng `fetch()` gọi API và hiển thị JSON.
- Thuật toán API: tính mức giảm giá theo giá trị `amount`.

## Cấu trúc thư mục Web

```text
Mon_Lap_Trinh_Web/
├── docker-compose.yml
├── nginx/
│   └── conf.d/
│       ├── site1.conf
│       └── site2.conf
├── nodered/
│   └── flows.json
├── db/
│   └── init/
│       └── 01_init.sql
├── web/
│   ├── site1/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   └── site2/
│       └── index.html
└── images/
```

## Chạy Docker Compose

Mở PowerShell/Ubuntu tại thư mục Web:

```bash
cd Mon_Lap_Trinh_Web
docker compose up -d
```

Kiểm tra container:

```bash
docker compose ps
```

## Các địa chỉ kiểm tra trên máy

- Website 1: `http://site1.localhost:8088`
- Website 2: `http://site2.localhost:8088`
- Node-RED: `http://localhost:1881`
- phpMyAdmin: `http://localhost:8090`
- API trực tiếp: `http://localhost:1881/api/tacke?amount=120000`
- API qua Nginx: `http://site1.localhost:8088/api/tacke?amount=120000`

JSON mẫu:

```json
{
  "ok": 1,
  "msg": "Thành công",
  "amount": 120000,
  "discount": 12000,
  "total": 108000,
  "rate": 0.1
}
```

## Cloudflared

Cloudflared được khai báo trong Docker Compose với profile `tunnel`. Muốn chạy public cần có domain đã quản lý trên Cloudflare và Tunnel Token thật.

Tạo file `.env` ở thư mục `Mon_Lap_Trinh_Web`:

```env
CLOUDFLARED_TUNNEL_TOKEN=YOUR_REAL_TUNNEL_TOKEN
```

Sau đó chạy:

```bash
docker compose --profile tunnel up -d
```





