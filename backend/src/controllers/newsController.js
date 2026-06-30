const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { tanggal: 'desc' },
    });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil berita' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findUnique({
      where: { id: Number(id) },
    });

    if (!news) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }

    res.json(news);
  } catch (error) {
    console.error('Error fetching news detail:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil detail berita' });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, isi } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const news = await prisma.news.create({
      data: { judul, isi, gambar },
    });

    res.status(201).json(news);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah berita' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;
    const gambar = req.file ? req.file.filename : undefined;

    const data = {};
    if (judul !== undefined) data.judul = judul;
    if (isi !== undefined) data.isi = isi;
    if (gambar) data.gambar = gambar;

    const news = await prisma.news.update({
      where: { id: Number(id) },
      data,
    });

    res.json(news);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate berita' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id: Number(id) } });
    res.json({ message: 'Berita berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus berita' });
  }
};
