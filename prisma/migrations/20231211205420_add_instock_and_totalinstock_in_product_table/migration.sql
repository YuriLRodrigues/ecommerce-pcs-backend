/*
  Warnings:

  - Added the required column `inStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalInStock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "inStock" BOOLEAN NOT NULL,
ADD COLUMN     "totalInStock" INTEGER NOT NULL;
