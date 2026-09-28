"""Minh họa AES-128-CBC - Môn An toàn và Bảo mật Thông tin."""

import os
import time
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


def main():
    print("=" * 64)
    print("CHUONG TRINH MA HOA / GIAI MA AES-128-CBC")
    print("=" * 64)

    key = os.urandom(16)
    message = "Thong tin bi mat cua sinh vien - Mon Bao Mat Thong Tin".encode()
    print(f"[+] Khoa AES-128: {key.hex()}")
    print(f"[+] Ban ro: {message.decode()}")

    start = time.perf_counter()
    cipher = AES.new(key, AES.MODE_CBC)
    iv = cipher.iv
    ciphertext = cipher.encrypt(pad(message, AES.block_size))
    encrypt_ms = (time.perf_counter() - start) * 1000
    print(f"[+] IV: {iv.hex()}")
    print(f"[+] Ban ma: {ciphertext.hex()}")
    print(f"[+] Thoi gian ma hoa: {encrypt_ms:.4f} ms")

    start = time.perf_counter()
    decipher = AES.new(key, AES.MODE_CBC, iv=iv)
    recovered = unpad(decipher.decrypt(ciphertext), AES.block_size)
    decrypt_ms = (time.perf_counter() - start) * 1000
    print(f"[+] Ban ro sau giai ma: {recovered.decode()}")
    print(f"[+] Thoi gian giai ma: {decrypt_ms:.4f} ms")

    print("[OK] Kiem tra:", "THANH CONG" if recovered == message else "THAT BAI")
    print("=" * 64)


if __name__ == "__main__":
    main()
