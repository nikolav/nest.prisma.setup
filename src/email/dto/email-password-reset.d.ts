import { User } from '@prisma/client'

export type UserWithPasswordResetToken = User & { token: string };