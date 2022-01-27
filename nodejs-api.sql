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

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_role_id`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 'Carlos Alberto', 'Arroyo Martínez', 'carlos.arroyo@bookstore.com', '$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte', 1, nOW(), nOW(), NULL),
    (2, 'Cathy Stefania', 'Guido Rojas', 'cathy.guido@bookstore.com', '$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte', 2, NOW(), NOW(), NULL),
    (3, 'Erandi Guadalupe', 'Vazquez Martínez', 'erandi.vazquez@bookstore.com', '$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte', 2, NOW(), NOW(), NULL);

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
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`) VALUES (1, 2), (2, 3);

--
-- Table structure for table `customer_addresses`
--

CREATE TABLE `customer_addresses` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `street_name` VARCHAR(64) NOT NULL,
    `street_number` VARCHAR(5) NOT NULL,
    `sublocality` VARCHAR(45) NOT NULL,
    `locality` VARCHAR(45) NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `postal_code` VARCHAR(5) NOT NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `customer_addresses_customer_id_fk_idx` (`customer_id`),
    CONSTRAINT `customer_addresses_customer_id_fk` FOREIGN KEY (`customer_id`)
        REFERENCES `customers` (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=6 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI
;
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

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(96) NOT NULL,
    `slug` VARCHAR(96) NOT NULL,
    `description` TEXT,
    `featured` TINYINT UNSIGNED NOT NULL DEFAULT '0',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT '0',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `products_slug_idx` (`slug`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `price` INT UNSIGNED NOT NULL DEFAULT '0',
    `compared_at_price` INT UNSIGNED NOT NULL DEFAULT '0',
    `cost_per_item` INT UNSIGNED NOT NULL DEFAULT '0',
    `quantity_on_stock` INT UNSIGNED NOT NULL DEFAULT '0',
    `product_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `product_variants_product_id_fk_idx` (`product_id`),
    CONSTRAINT `product_variants_product_id_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
--
-- Table structure for table `product_properties`
--

CREATE TABLE `product_properties` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `product_properties_name_idx` (`name`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
--
-- Table structure for table `product_properties`
--

CREATE TABLE `product_property_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `product_property_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `product_property_values_idx` (`product_id` , `product_property_id`),
    KEY `product_property_values_product_property_id_fk` (`product_property_id`),
    CONSTRAINT `product_property_values_product_id_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`),
    CONSTRAINT `product_property_values_product_property_id_fk` FOREIGN KEY (`product_property_id`)
        REFERENCES `product_properties` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
--
-- Table structure for table `variant_options`
--

CREATE TABLE `variant_options` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `variant_options_name_idx` (`name`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
--
-- Table structure for table `variant_option_values`
--

CREATE TABLE `variant_option_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `product_variant_id` BIGINT UNSIGNED NOT NULL,
    `variant_option_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `variant_option_values_variant_option_value_idx` (`value` , `product_variant_id` , `variant_option_id`),
    KEY `variant_option_values_product_variant_id_idx` (`product_variant_id`),
    KEY `variant_option_values_variant_option_id_idx` (`variant_option_id`),
    CONSTRAINT `variant_option_values_product_variant_id` FOREIGN KEY (`product_variant_id`)
        REFERENCES `product_variants` (`id`),
    CONSTRAINT `variant_option_values_variant_option_id` FOREIGN KEY (`variant_option_id`)
        REFERENCES `variant_options` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;