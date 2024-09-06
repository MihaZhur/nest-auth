-- CreateTable
CREATE TABLE "users" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "profiles" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "user_pk" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_pk_id_key" ON "users"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_pk_key" ON "profiles"("user_pk");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_pk_id_key" ON "profiles"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_pk_user_id_key" ON "profiles"("user_pk", "user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_pk_user_id_fkey" FOREIGN KEY ("user_pk", "user_id") REFERENCES "users"("pk", "id") ON DELETE CASCADE ON UPDATE CASCADE;
