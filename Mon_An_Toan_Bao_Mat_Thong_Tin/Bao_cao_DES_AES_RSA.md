# BÁO CÁO MÔN AN TOÀN VÀ BẢO MẬT THÔNG TIN

## Thông tin sinh viên

- Họ tên: **Vilasack**
- Môn: **An toàn và Bảo mật Thông tin**
- Deadline: **23h59 ngày 28/09/2026**

---

## 1. Thuật toán mã hóa DES

### 1.1. Khái niệm

DES (Data Encryption Standard) là thuật toán mã hóa đối xứng dạng block cipher. DES sử dụng khóa hiệu dụng 56 bit và xử lý dữ liệu theo từng khối 64 bit. Khóa được biểu diễn bằng 64 bit nhưng 8 bit dùng cho parity.

DES đã trở nên không còn phù hợp với yêu cầu bảo mật hiện đại vì không gian khóa 56 bit quá nhỏ trước khả năng tính toán hiện nay.

### 1.2. Quy trình mã hóa DES

1. Bản rõ 64 bit đi qua Initial Permutation (IP).
2. Khối dữ liệu được chia thành hai nửa L và R, mỗi nửa 32 bit.
3. Dữ liệu đi qua 16 vòng Feistel.
4. Trong mỗi vòng, R được mở rộng từ 32 lên 48 bit.
5. R được XOR với khóa vòng 48 bit, đi qua các S-box và phép hoán vị P.
6. Kết quả được XOR với L để tạo nửa mới.
7. Sau vòng 16, thực hiện hoán vị cuối Final Permutation (FP).
8. Kết quả là bản mã 64 bit.

### 1.3. Quy trình giải mã

DES có cấu trúc Feistel nên giải mã sử dụng cùng cấu trúc với mã hóa nhưng sử dụng các khóa vòng theo thứ tự ngược lại: K16, K15, ..., K1.

### 1.4. Hạn chế của DES

- Khóa hiệu dụng chỉ 56 bit.
- Có thể bị tấn công vét cạn với hệ thống tính toán đủ mạnh.
- Không nên sử dụng DES cho hệ thống mới.
- Trong thực tế hiện đại, AES được dùng thay cho DES.

---

## 2. Thuật toán AES

### 2.1. Khái niệm

AES (Advanced Encryption Standard) là thuật toán mã hóa đối xứng dạng block cipher được NIST lựa chọn làm chuẩn. AES xử lý khối dữ liệu 128 bit và hỗ trợ khóa 128, 192 hoặc 256 bit.

Số vòng mã hóa tương ứng là 10, 12 và 14 vòng.

### 2.2. Các bước mã hóa AES

Với AES-128, quy trình gồm AddRoundKey ban đầu và 10 vòng. Các vòng thông thường gồm:

1. **SubBytes:** thay thế từng byte thông qua S-box.
2. **ShiftRows:** dịch vòng các hàng của ma trận trạng thái.
3. **MixColumns:** biến đổi các cột bằng phép toán trong GF(2^8).
4. **AddRoundKey:** XOR trạng thái với khóa vòng.

Vòng cuối không thực hiện MixColumns.
### 2.3. Giải mã AES

Giải mã thực hiện các phép biến đổi ngược InvShiftRows, InvSubBytes, AddRoundKey và InvMixColumns theo thứ tự phù hợp với các khóa vòng đảo ngược. Với chế độ CBC, cần sử dụng đúng IV và khóa để khôi phục bản rõ.

### 2.4. Ưu điểm của AES

- Khóa 128/192/256 bit cung cấp mức an toàn cao.
- Tốc độ nhanh hơn nhiều so với các thuật toán bất đối xứng khi xử lý dữ liệu lớn.
- Có triển khai phần cứng và phần mềm hiệu quả.
- Được sử dụng rộng rãi trong các hệ thống bảo mật hiện đại.

---

## 3. Cài đặt AES bằng Python

Chương trình nằm tại `Code_AES/aes_demo.py`.

Chương trình sử dụng thư viện PyCryptodome và AES-128-CBC để minh họa:

1. Sinh khóa AES ngẫu nhiên 128 bit.
2. Sinh IV ngẫu nhiên.
3. Padding bản rõ theo block size của AES.
4. Mã hóa bản rõ thành ciphertext.
5. Giải mã ciphertext bằng cùng khóa và IV.
6. Kiểm tra bản rõ trước và sau giải mã có giống nhau hay không.
7. Đo thời gian mã hóa và giải mã.

Cài thư viện:

```bash
pip install -r requirements.txt
```

Chạy chương trình:

```bash
python Code_AES/aes_demo.py
```

---

## 4. Thuật toán RSA

### 4.1. Khái niệm

RSA là thuật toán mã hóa bất đối xứng sử dụng hai khóa: khóa công khai (Public Key) và khóa bí mật (Private Key). Độ an toàn của RSA dựa trên tính khó của việc phân tích số nguyên lớn thành các thừa số nguyên tố.

### 4.2. Sinh cặp khóa RSA

1. Chọn hai số nguyên tố lớn p và q.
2. Tính `n = p × q`.
3. Tính `φ(n) = (p - 1)(q - 1)`.
4. Chọn e sao cho `gcd(e, φ(n)) = 1`; giá trị thường dùng là 65537.
5. Tìm d sao cho `d × e ≡ 1 (mod φ(n))`.
6. Public Key là `(e, n)`.
7. Private Key là `(d, n)`.

Trong hệ thống thực tế nên sử dụng thư viện mật mã chuẩn thay vì tự viết phép toán RSA.

### 4.3. Mã hóa và giải mã

Về mặt toán học:

- Mã hóa: `C = M^e mod n`.
- Giải mã: `M = C^d mod n`.

Trong ứng dụng thực tế, RSA thường dùng padding an toàn như OAEP cho mã hóa và PSS cho chữ ký số.

---

## 5. Các mô hình áp dụng RSA

### 5.1. Xác thực người gửi

Người gửi tạo hash của thông điệp và dùng Private Key để tạo chữ ký số. Người nhận dùng Public Key của người gửi để kiểm tra chữ ký.

Mô hình này cung cấp xác thực nguồn gốc và phát hiện thay đổi nội dung. Nó không nên được mô tả đơn giản là "mã hóa toàn bộ thông điệp bằng Private Key".

### 5.2. Bảo mật dữ liệu dành cho người nhận

Người gửi sử dụng Public Key của người nhận để bảo vệ khóa hoặc dữ liệu nhỏ. Người nhận dùng Private Key của mình để khôi phục dữ liệu.

Điều này đảm bảo chỉ bên sở hữu Private Key tương ứng mới có thể giải mã. Đây là cơ chế bảo mật hướng tới người nhận, không tự động chứng minh danh tính của người nhận.

### 5.3. Kết hợp xác thực và bảo mật

Có thể kết hợp chữ ký số và mã hóa:

1. Người gửi tạo hash và ký bằng Private Key.
2. Tạo gói dữ liệu gồm nội dung và chữ ký.
3. Bảo vệ khóa phiên bằng Public Key của người nhận.
4. Người nhận dùng Private Key để lấy khóa phiên.
5. Giải mã dữ liệu và dùng Public Key của người gửi để kiểm tra chữ ký.
---

## 6. So sánh AES và RSA

| Tiêu chí | AES | RSA |
|---|---|---|
| Loại | Đối xứng | Bất đối xứng |
| Khóa | 128/192/256 bit | Thường 2048 bit hoặc cao hơn |
| Tốc độ | Rất nhanh | Chậm hơn đáng kể |
| Dữ liệu phù hợp | File, văn bản, luồng dữ liệu lớn | Khóa phiên, dữ liệu nhỏ, chữ ký |
| Trao đổi khóa | Cần cách chia sẻ khóa an toàn | Có Public Key để phân phối |
| Chữ ký số | Không phải mục đích chính | Có thể dùng để tạo chữ ký số |

Thời gian thực tế phụ thuộc CPU, thư viện, kích thước dữ liệu, chế độ mã hóa và cách triển khai. Vì vậy không nên dùng một hệ số cố định cho mọi máy tính. Chương trình AES trong repo đo thời gian AES; có thể dùng công cụ benchmark riêng nếu cần so sánh định lượng.

---

## 7. Kết hợp RSA và AES - Hybrid Encryption

RSA phù hợp để bảo vệ khóa nhỏ, còn AES phù hợp để mã hóa dữ liệu lớn. Vì vậy có thể kết hợp hai thuật toán:

1. Sinh một khóa AES ngẫu nhiên cho mỗi phiên.
2. Dùng AES để mã hóa toàn bộ dữ liệu.
3. Dùng Public Key RSA của người nhận để bảo vệ khóa AES.
4. Gửi ciphertext AES cùng encrypted AES key.
5. Người nhận dùng Private Key RSA để khôi phục khóa AES.
6. Dùng khóa AES để giải mã dữ liệu.
7. Nếu cần xác thực nguồn gửi, người gửi ký dữ liệu hoặc hash bằng Private Key RSA và người nhận xác minh bằng Public Key.

### 7.1. Ưu điểm

- AES xử lý dữ liệu lớn nhanh.
- RSA giải quyết bài toán phân phối khóa phiên.
- Chữ ký RSA có thể bổ sung xác thực và toàn vẹn.
- Đây là tư tưởng chung của nhiều hệ thống mật mã lai.

### 7.2. Ví dụ ứng dụng

- HTTPS/TLS.
- Hệ thống trao đổi tệp an toàn.
- Email mã hóa kiểu PGP/GPG.
- Các hệ thống cần trao đổi khóa phiên giữa hai bên.

---

## 8. Kết luận

DES là thuật toán có giá trị lịch sử nhưng khóa quá ngắn đối với yêu cầu hiện đại. AES là lựa chọn đối xứng phổ biến để mã hóa dữ liệu. RSA giải quyết các bài toán bất đối xứng như trao đổi khóa và chữ ký số. Trong hệ thống thực tế, việc kết hợp RSA với AES giúp tận dụng tốc độ của mã hóa đối xứng và khả năng phân phối khóa/xác thực của mật mã bất đối xứng.
