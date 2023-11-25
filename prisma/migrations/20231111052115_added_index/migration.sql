/*
  Warnings:

  - You are about to alter the column `totalArea` on the `farmer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `perSqCost` on the `farmer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `totalLandCost` on the `farmer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `farmer` MODIFY `totalArea` DECIMAL NOT NULL,
    MODIFY `perSqCost` DECIMAL NOT NULL,
    MODIFY `totalLandCost` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `Attachment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `farmerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Attachment_farmerId_idx`(`farmerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Farmer_createdAt_idx` ON `Farmer`(`createdAt`);

-- CreateIndex
CREATE INDEX `FarmerPayment_sNo_idx` ON `FarmerPayment`(`sNo`);

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `Farmer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
