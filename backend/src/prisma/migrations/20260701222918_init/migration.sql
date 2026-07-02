/*
  Warnings:

  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_doctor_id_fkey`;

-- AlterTable
ALTER TABLE `achievements` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `judul` VARCHAR(255) NOT NULL,
    MODIFY `gambar` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `admins` MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `news` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `judul` VARCHAR(255) NOT NULL,
    MODIFY `isi` TEXT NOT NULL,
    MODIFY `gambar` VARCHAR(255) NULL,
    MODIFY `tanggal` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `promotions` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `judul` VARCHAR(255) NOT NULL,
    MODIFY `gambar` VARCHAR(255) NULL,
    MODIFY `tanggal_mulai` TIMESTAMP(0) NULL,
    MODIFY `tanggal_berakhir` TIMESTAMP(0) NULL;

-- DropTable
DROP TABLE `contacts`;

-- DropTable
DROP TABLE `doctors`;

-- DropTable
DROP TABLE `facilities`;

-- DropTable
DROP TABLE `schedules`;

-- DropTable
DROP TABLE `settings`;

-- CreateTable
CREATE TABLE `dokter` (
    `id_dokter` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(150) NOT NULL,
    `foto_url` VARCHAR(255) NULL,
    `deskripsi` TEXT NULL,
    `id_spesialis` INTEGER NULL,
    `id_subspesialis` INTEGER NULL,
    `status_aktif` BOOLEAN NULL DEFAULT true,

    INDEX `id_spesialis`(`id_spesialis`),
    INDEX `id_subspesialis`(`id_subspesialis`),
    PRIMARY KEY (`id_dokter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal_praktek` (
    `id_jadwal` INTEGER NOT NULL AUTO_INCREMENT,
    `id_dokter` INTEGER NULL,
    `hari` ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu') NULL,
    `jam_mulai` TIME(0) NULL,
    `jam_selesai` TIME(0) NULL,
    `nama_poli` VARCHAR(100) NULL,

    INDEX `id_dokter`(`id_dokter`),
    PRIMARY KEY (`id_jadwal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_layanan` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NULL,
    `icon_url` VARCHAR(255) NULL,
    `urutan` INTEGER NULL DEFAULT 0,
    `status_aktif` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `layanan` (
    `id_layanan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NULL,
    `nama_layanan` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) NULL,
    `icon_url` VARCHAR(255) NULL,
    `gambar_banner` VARCHAR(255) NULL,
    `deskripsi_singkat` VARCHAR(255) NULL,
    `deskripsi_lengkap` TEXT NULL,
    `kontak_darurat` VARCHAR(50) NULL,
    `urutan` INTEGER NULL DEFAULT 0,
    `status_aktif` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `slug`(`slug`),
    INDEX `id_kategori`(`id_kategori`),
    PRIMARY KEY (`id_layanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spesialis` (
    `id_spesialis` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_spesialis` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NULL,

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id_spesialis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subspesialis` (
    `id_subspesialis` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_subspesialis` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NULL,

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id_subspesialis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipe_kamar` (
    `id_kamar` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kamar` VARCHAR(100) NOT NULL,
    `gambar_url` VARCHAR(255) NULL,
    `fasilitas` TEXT NULL,
    `harga_mulai` DECIMAL(12, 2) NULL,
    `jumlah_tersedia` INTEGER NULL DEFAULT 0,
    `status_aktif` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id_kamar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dokter` ADD CONSTRAINT `dokter_ibfk_1` FOREIGN KEY (`id_spesialis`) REFERENCES `spesialis`(`id_spesialis`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dokter` ADD CONSTRAINT `dokter_ibfk_2` FOREIGN KEY (`id_subspesialis`) REFERENCES `subspesialis`(`id_subspesialis`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `jadwal_praktek` ADD CONSTRAINT `jadwal_praktek_ibfk_1` FOREIGN KEY (`id_dokter`) REFERENCES `dokter`(`id_dokter`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `layanan` ADD CONSTRAINT `layanan_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_layanan`(`id_kategori`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- RedefineIndex
CREATE UNIQUE INDEX `username` ON `admins`(`username`);
DROP INDEX `admins_username_key` ON `admins`;
