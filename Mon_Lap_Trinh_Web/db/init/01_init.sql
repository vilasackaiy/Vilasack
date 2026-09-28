CREATE TABLE IF NOT EXISTS sinh_vien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ho_ten VARCHAR(120) NOT NULL,
  so_tien INT NOT NULL DEFAULT 0
);

INSERT INTO sinh_vien (ho_ten, so_tien) VALUES
('Nguyễn Văn An', 123),
('Trần Thị Bình', 456),
('Lê Minh Cường', 750);
