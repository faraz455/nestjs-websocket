-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(40) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `messageId` CHAR(40) NOT NULL,
    `messageText` TEXT NULL,
    `senderId` CHAR(40) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `dateCreated` BIGINT NOT NULL,
    `dateUpdated` BIGINT NOT NULL,

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
