-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "actorId" INTEGER;

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
