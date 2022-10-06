import { PrismaClient } from '@prisma/client';
import { map } from 'lodash';
import config from './config';
console.log({ config });
// import { hashSync } from 'bcryptjs';

// const prisma = new PrismaClient();

// const main = async () => {
//   await prisma.$connect();
//   //
//   const res = await prisma.user.findMany({
//     where: {
//       roles: {
//         some: {
//           role: {
//             type: 'admin',
//           },
//         },
//       },
//     },
//   });
//   console.log({ res });
// };

// main()
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

