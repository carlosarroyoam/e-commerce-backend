CREATE DATABASE IF NOT EXISTS `nodejs_api`;

USE `nodejs_api`;

--
-- Table structure for table `user_roles`
--

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

CREATE TABLE `customers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `customers_user_id_fk` (`user_id`),
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
    `apartament_number` VARCHAR(5),
    `sublocality` VARCHAR(45) NOT NULL,
    `locality` VARCHAR(45) NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `postal_code` VARCHAR(5) NOT NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `customer_addresses_customer_id_fk` (`customer_id`),
    CONSTRAINT `customer_addresses_customer_id_fk` FOREIGN KEY (`customer_id`)
        REFERENCES `customers` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `customer_addresses`
--

INSERT INTO `customer_addresses` VALUES (1,'Leona Vicario','12',NULL,'Centro','Acambaro','Guanajuato','38923','4431232123',1);

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `is_super` TINYINT NOT NULL DEFAULT 0,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `admins_user_id_fk` (`user_id`),
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
    UNIQUE KEY `personal_access_tokens_fingerprint_user_id_idx` (`user_id`, `fingerprint`),
    KEY `personal_access_tokens_user_id_fk` (`user_id`),
    CONSTRAINT `personal_access_tokens_user_id_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` VALUES (1,'Smartphones');

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(96) NOT NULL,
    `slug` VARCHAR(96) NOT NULL,
    `description` TEXT,
    `featured` TINYINT UNSIGNED NOT NULL DEFAULT '0',
    `active` TINYINT UNSIGNED NOT NULL DEFAULT '0',
    `category_id` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `products_slug_idx` (`slug`),
    FULLTEXT `products_title_description_idx` (`title` , `description`),
    KEY `products_category_id_fk` (`category_id`),
    CONSTRAINT `products_category_id_fk` FOREIGN KEY (`category_id`)
        REFERENCES `categories` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `products`
--

INSERT INTO `products` VALUES (1,'Moto G100','moto-g100','Moto g100',0,1,1,'2022-01-31 14:58:02','2022-01-31 19:09:45',NULL);

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(64) NOT NULL,
    `price` INT UNSIGNED NOT NULL DEFAULT '0',
    `compared_at_price` INT UNSIGNED NOT NULL DEFAULT '0',
    `cost_per_item` INT UNSIGNED NOT NULL DEFAULT '0',
    `quantity_on_stock` INT UNSIGNED NOT NULL DEFAULT '0',
    `product_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `variants_product_id_fk` (`product_id`),
    CONSTRAINT `variants_product_id_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` VALUES (1,'motog100azulnimbus',500,0,400,100,1);

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(128) NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `product_images_url_idx` (`url`),
    KEY `product_images_product_id_fk` (`product_id`),
    CONSTRAINT `product_images_product_id_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`),
    KEY `product_images_variant_id_fk` (`variant_id`),
    CONSTRAINT `product_images_variant_id_fk` FOREIGN KEY (`variant_id`)
        REFERENCES `variants` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `attributes_name_idx` (`name`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` VALUES (1,'Brand'),(2,'Model');

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `attribute_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `product_attribute_values_idx` (`product_id` , `attribute_id`),
    KEY `product_attribute_values_product_id_fk` (`product_id`),
    CONSTRAINT `product_attribute_values_product_id_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`),
    KEY `product_attribute_values_attribute_id_fk` (`attribute_id`),
    CONSTRAINT `product_attribute_values_attribute_id_fk` FOREIGN KEY (`attribute_id`)
        REFERENCES `attributes` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `product_attribute_values`
--

INSERT INTO `product_attribute_values` VALUES (1,'Motorola',1,1),(2,'Moto G100',1,2);

--
-- Table structure for table `variant_attribute_values`
--

CREATE TABLE `variant_attribute_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    `attribute_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `variant_attribute_values_variant_option_value_idx` (`value` , `variant_id` , `attribute_id`),
    KEY `variant_attribute_values_variant_id_fk` (`variant_id`),
    CONSTRAINT `variant_attribute_values_variant_id_fk` FOREIGN KEY (`variant_id`)
        REFERENCES `variants` (`id`),
    KEY `variant_attribute_values_attribute_id_fk` (`attribute_id`),
    CONSTRAINT `variant_attribute_values_attribute_id_fk` FOREIGN KEY (`attribute_id`)
        REFERENCES `attributes` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `variant_attribute_values`
--

INSERT INTO `variant_attribute_values` VALUES (1,'Nimbus',1,1),(2,'128gb',1,2);
