"""So sanh thoi gian AES-128 va RSA-2048 tren du lieu nho."""

import os
import time
from statistics import mean
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from Crypto.Util.Padding import pad, unpad


def bench_aes(message, rounds=100):
    key = os.urandom(16)
    times_enc, times_dec = [], []
    for _ in range(rounds):
        cipher = AES.new(key, AES.MODE_CBC)
        start = time.perf_counter()
        ciphertext = cipher.encrypt(pad(message, AES.block_size))
        times_enc.append((time.perf_counter() - start) * 1000)
        start = time.perf_counter()
        AES.new(key, AES.MODE_CBC, iv=cipher.iv).decrypt(ciphertext)
        times_dec.append((time.perf_counter() - start) * 1000)
    return mean(times_enc), mean(times_dec)


def bench_rsa(message, rounds=100):
    private_key = RSA.generate(2048)
    public_key = private_key.publickey()
    enc = PKCS1_OAEP.new(public_key, hashAlgo=SHA256)
    dec = PKCS1_OAEP.new(private_key, hashAlgo=SHA256)
    times_enc, times_dec = [], []
    for _ in range(rounds):
        start = time.perf_counter()
        ciphertext = enc.encrypt(message)
        times_enc.append((time.perf_counter() - start) * 1000)
        start = time.perf_counter()
        dec.decrypt(ciphertext)
        times_dec.append((time.perf_counter() - start) * 1000)
    return mean(times_enc), mean(times_dec)


def main():
    message = b"1234567890ABCDEF1234567890ABCDEF"
    aes_enc, aes_dec = bench_aes(message)
    rsa_enc, rsa_dec = bench_rsa(message)
    print("So sanh AES-128-CBC va RSA-2048 OAEP (100 lan, 32 byte)")
    print(f"AES  ma hoa: {aes_enc:.4f} ms | giai ma: {aes_dec:.4f} ms")
    print(f"RSA  ma hoa: {rsa_enc:.4f} ms | giai ma: {rsa_dec:.4f} ms")
    print("Luu y: ket qua phu thuoc CPU, thu vien va moi truong.")


if __name__ == "__main__":
    main()
