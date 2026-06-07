const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil prestasi' });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, deskripsi, tahun } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const achievement = await prisma.achievement.create({
      data: { judul, deskripsi, tahun: tahun ? Number(tahun) : null, gambar },
    });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah prestasi' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, tahun } = req.body;
    const gambar = req.file ? req.file.filename : undefined;

    const data = { judul, deskripsi, tahun: tahun ? Number(tahun) : undefined };
    if (gambar) data.gambar = gambar;

    const achievement = await prisma.achievement.update({ where: { id: Number(id) }, data });
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate prestasi' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id: Number(id) } });
    res.json({ message: 'Prestasi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus prestasi' });
  }
};
