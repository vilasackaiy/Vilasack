"""Minh hoa RSA-2048: ma hoa OAEP va chu ky PSS."""

import hashlib
import time
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import pss
from Crypto.Cipher import PKCS1_OAEP


def main():
    print("=" * 64)
    print("CHUONG TRINH RSA-2048: OAEP + PSS")
    print("=" * 64)

    key = RSA.generate(2048)
    private_key = key
    public_key = key.publickey()
    message = b"Thong tin can bao mat bang RSA"

    print("[+] Tao cap khoa RSA-2048: THANH CONG")
    print("[+] Public key: (e, n)")
    print(f"[+] e = {public_key.e}")
    print(f"[+] n (bit length) = {public_key.size_in_bits()}")

    encryptor = PKCS1_OAEP.new(public_key, hashAlgo=SHA256)
    decryptor = PKCS1_OAEP.new(private_key, hashAlgo=SHA256)

    start = time.perf_counter()
    ciphertext = encryptor.encrypt(message)
    encrypt_ms = (time.perf_counter() - start) * 1000

    start = time.perf_counter()
    recovered = decryptor.decrypt(ciphertext)
    decrypt_ms = (time.perf_counter() - start) * 1000

    print(f"[+] Ma hoa OAEP: {encrypt_ms:.4f} ms")
    print(f"[+] Giai ma OAEP: {decrypt_ms:.4f} ms")
    print("[OK] Kiem tra OAEP:", "THANH CONG" if recovered == message else "THAT BAI")

    digest = SHA256.new(message)
    signature = pss.new(private_key).sign(digest)
    try:
        pss.new(public_key).verify(SHA256.new(message), signature)
        print("[OK] Xac thuc chu ky PSS: THANH CONG")
    except (ValueError, TypeError):
        print("[FAIL] Xac thuc chu ky PSS: THAT BAI")

    print("[+] SHA-256 thong diep:", hashlib.sha256(message).hexdigest())
    print("=" * 64)


if __name__ == "__main__":
    main()
