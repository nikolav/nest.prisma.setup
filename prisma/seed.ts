import { PrismaClient } from '@prisma/client';
import config from '../config';
import * as bcrypt from 'bcryptjs';
//
const prisma = new PrismaClient();
const { APP_ID } = config;

const main_ = async () => {
  //
  await prisma.user.deleteMany({});
  await prisma.main.deleteMany({});

  //
  const passwordHash = bcrypt.hashSync('122333', 1);
  [
    {
      email: 'admin@nikolav.rs',
      passwordHash,
    },
    {
      email: 'user-1@email.com',
      passwordHash,
    },
  ].forEach(
    async ({ email, passwordHash }) =>
      await prisma.user.create({
        data: { email, passwordHash },
      }),
  );
  [
    { name: 'app.name', value: APP_ID },
    { name: 'test', value: 'test' },
    { name: 'x', value: '1' },
  ].forEach(
    async ({ name, value }) =>
      await prisma.main.create({
        data: { name, value },
      }),
  );
  //
};

main_()
  .catch((error) => {
    console.log(error);
    process.exit(-1);
  })
  .finally(async () => await prisma.$disconnect());
