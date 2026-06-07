const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: hashedPassword },
  });

  await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      telepon: '(0271) 000000',
      email: 'info@rsupkusragen.com',
      alamat: 'Jl. Contoh No. 1, Sragen, Jawa Tengah',
      maps_link: 'https://maps.google.com/?q=Sragen',
    },
  });

  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: { linktree_url: 'https://linktr.ee/rsupkusragen' },
  });

  console.log('Seed berhasil');
}

main().catch(console.error).finally(() => prisma.$disconnect());
