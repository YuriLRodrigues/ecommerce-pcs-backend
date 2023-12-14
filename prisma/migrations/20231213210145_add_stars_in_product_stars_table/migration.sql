/*
  Warnings:

  - Added the required column `stars` to the `ProductStars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductStars" ADD COLUMN     "stars" DOUBLE PRECISION NOT NULL;
