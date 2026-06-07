const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const contact = await prisma.contact.findFirst();
    res.json(contact || {});
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil kontak' });
  }
};

exports.update = async (req, res) => {
  try {
    const { telepon, email, alamat, maps_link } = req.body;
    let contact = await prisma.contact.findFirst();
    
    if (!contact) {
      contact = await prisma.contact.create({
        data: { telepon, email, alamat, maps_link },
      });
    } else {
      contact = await prisma.contact.update({
        where: { id: contact.id },
        data: { telepon, email, alamat, maps_link },
      });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate kontak' });
  }
};
