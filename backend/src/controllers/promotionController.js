const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseEndDate = (value) => {
  const date = parseDate(value);
  if (!date) return null;
  date.setHours(23, 59, 59, 999);
  return date;
};

exports.getAllActive = async (req, res) => {
  try {
    const promotions = await prisma.promotion.findMany({
      where: {
        tanggal_berakhir: { gte: new Date() },
      },
      orderBy: { tanggal_mulai: 'desc' },
    });
    res.json(promotions);
  } catch (error) {
    console.error('Error fetching active promotions:', error);
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
    console.error('Error fetching promotions:', error);
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
        tanggal_mulai: parseDate(tanggal_mulai),
        tanggal_berakhir: parseEndDate(tanggal_berakhir),
      },
    });

    res.status(201).json(promotion);
  } catch (error) {
    console.error('Error creating promotion:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah promo' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, tanggal_mulai, tanggal_berakhir } = req.body;
    const gambar = req.file ? req.file.filename : undefined;

    const data = {};
    if (judul !== undefined) data.judul = judul;
    if (deskripsi !== undefined) data.deskripsi = deskripsi;
    if (tanggal_mulai !== undefined) data.tanggal_mulai = parseDate(tanggal_mulai);
    if (tanggal_berakhir !== undefined) data.tanggal_berakhir = parseEndDate(tanggal_berakhir);
    if (gambar) data.gambar = gambar;

    const promotion = await prisma.promotion.update({
      where: { id: Number(id) },
      data,
    });

    res.json(promotion);
  } catch (error) {
    console.error('Error updating promotion:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate promo' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.promotion.delete({ where: { id: Number(id) } });
    res.json({ message: 'Promo berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting promotion:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus promo' });
  }
};
