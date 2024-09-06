// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

async function generateRefreshToken(): Promise<string> {
  return crypto.randomBytes(40).toString('hex');
}

async function main() {
  // Создаем пользователей
  const user1Password = await hashPassword('password123');
  const user1RefreshToken = await generateRefreshToken();

  const user2Password = await hashPassword('password456');
  const user2RefreshToken = await generateRefreshToken();

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: user1Password,
      name: 'User One',
      refreshToken: user1RefreshToken,
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'This is the first post by User One.',
            published: true,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: user2Password,
      name: 'User Two',
      refreshToken: user2RefreshToken,
      posts: {
        create: [
          {
            title: 'First Post by User Two',
            content: 'This is the first post by User Two.',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
