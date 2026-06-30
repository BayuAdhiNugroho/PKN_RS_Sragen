const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const normalizeFacility = (facility) => ({
  id: facility.id_kamar ?? facility.id,
  id_kamar: facility.id_kamar ?? facility.id,
  nama: facility.nama_kamar ?? facility.nama ?? '',
  nama_kamar: facility.nama_kamar ?? facility.nama ?? '',
  deskripsi: facility.fasilitas ?? facility.deskripsi ?? '',
  fasilitas: facility.fasilitas ?? facility.deskripsi ?? '',
  gambar: facility.gambar_url ?? facility.gambar ?? null,
  gambar_url: facility.gambar_url ?? facility.gambar ?? null,
  harga_mulai: facility.harga_mulai ? Number(facility.harga_mulai) : null,
  jumlah_tersedia: facility.jumlah_tersedia ?? 0,
  status_aktif: facility.status_aktif ?? true,
});

const parseBoolean = (value, defaultValue = true) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'yes', 'on', 'aktif'].includes(String(value).toLowerCase());
};

const parseNumberOrNull = (value) => {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

exports.getAll = async (req, res) => {
  try {
    const facilities = await prisma.tipe_kamar.findMany({
      orderBy: { id_kamar: 'desc' },
    });
    res.json(facilities.map(normalizeFacility));
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil fasilitas' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, nama_kamar, deskripsi, fasilitas, harga_mulai, jumlah_tersedia, status_aktif } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const facility = await prisma.tipe_kamar.create({
      data: {
        nama_kamar: nama || nama_kamar,
        fasilitas: deskripsi ?? fasilitas,
        gambar_url: gambar,
        harga_mulai: parseNumberOrNull(harga_mulai),
        jumlah_tersedia: parseNumberOrNull(jumlah_tersedia) ?? 0,
        status_aktif: parseBoolean(status_aktif, true),
      },
    });
    res.status(201).json(normalizeFacility(facility));
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambah fasilitas' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nama_kamar, deskripsi, fasilitas, harga_mulai, jumlah_tersedia, status_aktif } = req.body;
    const gambar = req.file ? req.file.filename : undefined;

    const data = {};
    if (nama || nama_kamar) data.nama_kamar = nama || nama_kamar;
    if (deskripsi !== undefined || fasilitas !== undefined) data.fasilitas = deskripsi ?? fasilitas;
    if (gambar) data.gambar_url = gambar;
    if (harga_mulai !== undefined) data.harga_mulai = parseNumberOrNull(harga_mulai);
    if (jumlah_tersedia !== undefined) data.jumlah_tersedia = parseNumberOrNull(jumlah_tersedia) ?? 0;
    if (status_aktif !== undefined) data.status_aktif = parseBoolean(status_aktif, true);

    const facility = await prisma.tipe_kamar.update({ where: { id_kamar: Number(id) }, data });
    res.json(normalizeFacility(facility));
  } catch (error) {
    console.error('Error updating facility:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate fasilitas' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tipe_kamar.delete({ where: { id_kamar: Number(id) } });
    res.json({ message: 'Fasilitas berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus fasilitas' });
  }
};
