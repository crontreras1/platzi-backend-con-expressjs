const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // const demoUsers = [
  //   { name: 'Cristian', email: 'cristian@example.com' },
  //   { name: 'Camilo', email: 'camilo@example.com' },
  //   { name: 'Jorge', email: 'jorge@example.com' }
  // ];

  // for (const user of demoUsers) {
  //   await prisma.user.create({
  //     data: user
  //   });
  // }

  // console.log('Usuarios de demostración creados con éxito');

  await prisma.user.deleteMany();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });