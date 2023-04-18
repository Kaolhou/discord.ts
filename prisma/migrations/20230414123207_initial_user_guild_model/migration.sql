-- CreateTable
CREATE TABLE `Guilds` (
    `id` VARCHAR(191) NOT NULL,
    `dailyMeme` BOOLEAN NOT NULL,
    `dailyMemeChannel` INTEGER NULL,

    UNIQUE INDEX `Guilds_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `waifusGenerated` INTEGER NOT NULL,
    `waifusThisWeek` INTEGER NOT NULL,
    `lastWaifu` DATETIME(3) NOT NULL,
    `isSubscriber` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWaifus` (
    `waifuId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserWaifus_waifuId_key`(`waifuId`),
    UNIQUE INDEX `UserWaifus_userId_key`(`userId`),
    PRIMARY KEY (`waifuId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Waifu` (
    `id` INTEGER NOT NULL,
    `imgUrl` VARCHAR(191) NOT NULL,
    `textUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Waifu_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserWaifus` ADD CONSTRAINT `UserWaifus_waifuId_fkey` FOREIGN KEY (`waifuId`) REFERENCES `Waifu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWaifus` ADD CONSTRAINT `UserWaifus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
