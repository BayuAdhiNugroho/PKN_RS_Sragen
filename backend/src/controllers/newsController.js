exports.getAll = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil berita' });
  }
};

exports.getById = async (req, res) => {
  res.status(404).json({ message: 'Data berita belum tersedia pada skema database saat ini.' });
};

exports.create = async (req, res) => {
  res.status(501).json({ message: 'Fitur berita belum tersedia pada skema database saat ini.' });
};

exports.update = async (req, res) => {
  res.status(501).json({ message: 'Fitur berita belum tersedia pada skema database saat ini.' });
};

exports.remove = async (req, res) => {
  res.status(501).json({ message: 'Fitur berita belum tersedia pada skema database saat ini.' });
};
