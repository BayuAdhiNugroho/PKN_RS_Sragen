const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const facilities = await prisma.facility.findMany();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil fasilitas' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, deskripsi } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const facility = await prisma.facility.create({
      data: { nama, deskripsi, gambar },
    });
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah fasilitas' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;
    const gambar = req.file ? req.file.filename : undefined;

    const data = { nama, deskripsi };
    if (gambar) data.gambar = gambar;

    const facility = await prisma.facility.update({ where: { id: Number(id) }, data });
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate fasilitas' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.facility.delete({ where: { id: Number(id) } });
    res.json({ message: 'Fasilitas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus fasilitas' });
  }
};
