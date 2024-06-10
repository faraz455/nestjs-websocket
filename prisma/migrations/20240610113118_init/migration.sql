-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(40) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `birthDateString` VARCHAR(191) NULL DEFAULT '-',
    `email` VARCHAR(100) NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_mobile_key`(`mobile`),
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
