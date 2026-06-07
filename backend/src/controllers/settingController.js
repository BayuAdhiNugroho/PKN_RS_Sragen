const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLinktree = async (req, res) => {
  try {
    const setting = await prisma.setting.findFirst();
    res.json({ linktree_url: setting?.linktree_url || null });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil linktree' });
  }
};

exports.updateLinktree = async (req, res) => {
  try {
    const { linktree_url } = req.body;
    let setting = await prisma.setting.findFirst();
    
    if (!setting) {
      setting = await prisma.setting.create({
        data: { linktree_url },
      });
    } else {
      setting = await prisma.setting.update({
        where: { id: setting.id },
        data: { linktree_url },
      });
    }
    
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate linktree' });
  }
};
