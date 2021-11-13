/*
  Warnings:

  - You are about to drop the column `roomId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_roomId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomId";
