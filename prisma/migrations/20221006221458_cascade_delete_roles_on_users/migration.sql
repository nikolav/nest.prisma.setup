-- DropForeignKey
ALTER TABLE "ln_roles_users" DROP CONSTRAINT "ln_roles_users_roleId_fkey";

-- DropForeignKey
ALTER TABLE "ln_roles_users" DROP CONSTRAINT "ln_roles_users_userId_fkey";

-- AddForeignKey
ALTER TABLE "ln_roles_users" ADD CONSTRAINT "ln_roles_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ln_roles_users" ADD CONSTRAINT "ln_roles_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
