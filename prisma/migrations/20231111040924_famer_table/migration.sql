-- CreateTable
CREATE TABLE `Farmer` (
    `id` VARCHAR(191) NOT NULL,
    `landTitle` TEXT NOT NULL,
    `landLocation` TEXT NOT NULL,
    `khasraNumber` INTEGER NOT NULL,
    `totalArea` DECIMAL NOT NULL,
    `perSqCost` DECIMAL NOT NULL,
    `totalLandCost` DECIMAL NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FarmerDetails` (
    `id` VARCHAR(191) NOT NULL,
    `fName` VARCHAR(191) NOT NULL,
    `lName` VARCHAR(191) NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `pinCode` BIGINT NOT NULL,
    `phoneNumber` BIGINT NOT NULL,
    `aadharNumber` BIGINT NOT NULL,
    `docsProoURL` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `farmerDetailId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FarmerDetails_farmerDetailId_key`(`farmerDetailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FarmerPayment` (
    `id` VARCHAR(191) NOT NULL,
    `sNo` INTEGER NOT NULL AUTO_INCREMENT,
    `tottalAmount` DECIMAL(65, 30) NOT NULL,
    `paidAmount` DECIMAL(65, 30) NOT NULL,
    `leftAmount` DECIMAL(65, 30) NOT NULL,
    `particular` TEXT NOT NULL,
    `notes` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `farmerPayId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FarmerPayment_sNo_key`(`sNo`),
    UNIQUE INDEX `FarmerPayment_farmerPayId_key`(`farmerPayId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FarmerDetails` ADD CONSTRAINT `FarmerDetails_farmerDetailId_fkey` FOREIGN KEY (`farmerDetailId`) REFERENCES `Farmer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FarmerPayment` ADD CONSTRAINT `FarmerPayment_farmerPayId_fkey` FOREIGN KEY (`farmerPayId`) REFERENCES `Farmer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
