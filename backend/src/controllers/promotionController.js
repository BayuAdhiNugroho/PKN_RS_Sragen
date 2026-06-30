exports.getAllActive = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil promo' });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil promo' });
  }
};

exports.create = async (req, res) => {
  res.status(501).json({ message: 'Fitur promo belum tersedia pada skema database saat ini.' });
};

exports.update = async (req, res) => {
  res.status(501).json({ message: 'Fitur promo belum tersedia pada skema database saat ini.' });
};

exports.remove = async (req, res) => {
  res.status(501).json({ message: 'Fitur promo belum tersedia pada skema database saat ini.' });
};
