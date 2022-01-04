CREATE DATABASE IF NOT EXISTS `nodejs_api`;

USE `nodejs_api`;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;

CREATE TABLE user_roles (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(32) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` VALUES (1, 'App/Admin'), (2, 'App/Customer');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `password` VARCHAR(96) NOT NULL,
    `user_role_id` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_idx` (`email`),
    INDEX `users_deleted_at_idx` (`deleted_at`),
    FULLTEXT `users_full_name_idx` (`first_name` , `last_name`),
    CONSTRAINT `users_user_role_id_fk` FOREIGN KEY (`user_role_id`)
        REFERENCES `user_roles` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'Carlos Alberto', 'Arroyo Martínez', 'carlosarroyo@gmail.com', '$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte', 1, now(), now(), NULL);

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `customers_user_id_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `is_super` TINYINT NOT NULL DEFAULT 0,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `admins_user_id_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `is_super`, `user_id`) VALUES (1, 1, 1);

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(254) NOT NULL,
    `last_used_at` TIMESTAMP DEFAULT NULL,
    `fingerprint` VARCHAR(36) NOT NULL,
    `user_agent` VARCHAR(128),
    `user_id` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `personal_access_tokens_token_idx` (`token`),
    UNIQUE KEY `personal_access_tokens_fingerprint_idx` (`fingerprint`),
    CONSTRAINT `personal_access_tokens_user_id_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
