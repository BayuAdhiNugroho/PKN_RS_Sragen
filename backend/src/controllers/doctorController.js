const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { schedules: true },
      orderBy: { created_at: 'desc' },
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data dokter' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, spesialis, deskripsi } = req.body;
    const foto = req.file ? req.file.filename : null;

    const doctor = await prisma.doctor.create({
      data: { nama, spesialis, deskripsi, foto },
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah dokter' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, spesialis, deskripsi } = req.body;
    const foto = req.file ? req.file.filename : undefined;

    const data = { nama, spesialis, deskripsi };
    if (foto) data.foto = foto;

    const doctor = await prisma.doctor.update({ where: { id: Number(id) }, data });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate dokter' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(id) },
      include: { schedules: true },
    });
    if (!doctor) {
      return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil detail dokter' });
  }
};

exports.getSpecialties = async (req, res) => {
  try {
    const specialties = await prisma.doctor.findMany({
      distinct: ['spesialis'],
      select: { spesialis: true },
      orderBy: { spesialis: 'asc' },
    });
    res.json(specialties.map(s => s.spesialis));
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data spesialisasi' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.doctor.delete({ where: { id: Number(id) } });
    res.json({ message: 'Dokter berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus dokter' });
  }
};
