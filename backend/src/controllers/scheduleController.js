const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany({
      include: { doctor: true },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil jadwal' });
  }
};

exports.create = async (req, res) => {
  try {
    const { doctor_id, hari, jam_mulai, jam_selesai } = req.body;
    const schedule = await prisma.schedule.create({
      data: { doctor_id: Number(doctor_id), hari, jam_mulai, jam_selesai },
    });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah jadwal' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id, hari, jam_mulai, jam_selesai } = req.body;
    const schedule = await prisma.schedule.update({
      where: { id: Number(id) },
      data: { doctor_id: Number(doctor_id), hari, jam_mulai, jam_selesai },
    });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate jadwal' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.schedule.delete({ where: { id: Number(id) } });
    res.json({ message: 'Jadwal berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus jadwal' });
  }
};
