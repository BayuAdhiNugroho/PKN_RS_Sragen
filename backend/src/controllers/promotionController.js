const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllActive = async (req, res) => {
  try {
    const today = new Date();
    const promotions = await prisma.promotion.findMany({
      where: {
        tanggal_berakhir: { gte: today },
        tanggal_mulai: { lte: today },
      },
    });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil promo' });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { tanggal_mulai: 'desc' },
    });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil promo' });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal_mulai, tanggal_berakhir } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const promotion = await prisma.promotion.create({
      data: {
        judul,
        deskripsi,
        gambar,
        tanggal_mulai: new Date(tanggal_mulai),
        tanggal_berakhir: new Date(tanggal_berakhir),
      },
    });
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah promo' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, tanggal_mulai, tanggal_berakhir } = req.body;
    const gambar = req.file ? req.file.filename : undefined;

    const data = { judul, deskripsi };
    if (gambar) data.gambar = gambar;
    if (tanggal_mulai) data.tanggal_mulai = new Date(tanggal_mulai);
    if (tanggal_berakhir) data.tanggal_berakhir = new Date(tanggal_berakhir);

    const promotion = await prisma.promotion.update({ where: { id: Number(id) }, data });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate promo' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.promotion.delete({ where: { id: Number(id) } });
    res.json({ message: 'Promo berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus promo' });
  }
};
