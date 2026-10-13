-- 1. Buat Database (Jalankan ini jika database belum ada)
-- CREATE DATABASE asset_fumindo;

-- Hubungkan ke database asset_fumindo sebelum menjalankan script di bawah:
-- \c asset_fumindo

-- 2. Buat Tabel asset sesuai instruksi soal
CREATE TABLE IF NOT EXISTS asset (
    asset_id SERIAL PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Consumable', 'Non-Consumable'))
);

-- 3. Data Dummy (Seed Data) untuk pengujian awal
INSERT INTO asset (asset_name, stock_quantity, category) VALUES
('Kertas A4', 25, 'Consumable'),
('Tinta Printer Epson', 10, 'Consumable'),
('Laptop Dell Latitude', 5, 'Non-Consumable'),
('Monitor LG 24 Inch', 8, 'Non-Consumable'),
('Pulpen Pilot Hitam', 50, 'Consumable');
