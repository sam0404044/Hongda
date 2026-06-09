-- CreateTable
CREATE TABLE `instructors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `title` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `avatar_url` VARCHAR(500) NULL,
    `specialties` JSON NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `instructors_slug_key`(`slug`),
    INDEX `instructors_is_published_sort_order_idx`(`is_published`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `homepage_slots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `section` VARCHAR(50) NOT NULL,
    `item_type` VARCHAR(30) NOT NULL,
    `course_id` INTEGER NULL,
    `article_id` INTEGER NULL,
    `instructor_id` INTEGER NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `homepage_slots_section_is_active_sort_order_idx`(`section`, `is_active`, `sort_order`),
    INDEX `homepage_slots_course_id_idx`(`course_id`),
    INDEX `homepage_slots_article_id_idx`(`article_id`),
    INDEX `homepage_slots_instructor_id_idx`(`instructor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `homepage_slots` ADD CONSTRAINT `homepage_slots_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homepage_slots` ADD CONSTRAINT `homepage_slots_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homepage_slots` ADD CONSTRAINT `homepage_slots_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
