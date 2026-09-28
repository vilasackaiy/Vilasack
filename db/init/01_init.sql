CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price INT NOT NULL,
  category VARCHAR(40) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menu_items (name, price, category) VALUES
('ເຂົ້າຜັດໝູ', 35000, 'main'),
('ເຂົ້າກະເພົາໄກ່', 40000, 'main'),
('ເຝີຊີ້ນ', 45000, 'noodle'),
('ຜັດໄທກຸ້ງ', 50000, 'noodle'),
('ໄກ່ທອດ', 38000, 'main'),
('ນ້ຳໂຄກ', 15000, 'drink');
