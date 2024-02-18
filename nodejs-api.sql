CREATE DATABASE IF NOT EXISTS `ecommerce`;

USE `ecommerce`;

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(32) NOT NULL,
    UNIQUE KEY `user_roles_type_idx` (`type`),
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
    `user_role_id` TINYINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_idx` (`email`),
    INDEX `users_deleted_at_idx` (`deleted_at`),
    FULLTEXT `users_full_name_idx` (`first_name` , `last_name`),
    CONSTRAINT `users_user_role_id_fk` FOREIGN KEY (`user_role_id`)
        REFERENCES `user_roles` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `users`
--

INSERT INTO `users`
VALUES
    (1,'Carlos Alberto','Arroyo Martínez','carlos.arroyo@e-commerce.com','$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte',1,'2022-01-31 21:45:56','2022-01-31 21:45:56',NULL),
    (2,'Cathy Stefania','Guido Rojas','cathy.guido@e-commerce.com','$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte',1,'2022-01-31 21:45:56','2022-01-31 21:45:56',NULL);

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `customers_user_id_fk` (`user_id`),
    UNIQUE KEY `customers_user_id_idx` (`user_id`),
    CONSTRAINT `customers_user_id_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` VALUES (1,2);

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
    `is_super` BIT NOT NULL DEFAULT 0,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `admins_user_id_fk` (`user_id`),
    UNIQUE KEY `admins_user_id_idx` (`user_id`),
    CONSTRAINT `admins_user_id_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
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
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `categories_deleted_at_idx` (`deleted_at`),
    UNIQUE KEY `categories_title_idx` (`title`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` VALUES (1,'Smartphones',NULL),(2,'Headphones',NULL),(3,'Accesories',NULL);

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(96) NOT NULL,
    `slug` VARCHAR(96) NOT NULL,
    `description` TEXT,
    `featured` BIT NOT NULL DEFAULT 0,
    `active` BIT NOT NULL DEFAULT 0,
    `category_id` TINYINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `products_slug_idx` (`slug`),
    FULLTEXT `products_title_description_idx` (`title`, `description`),
    KEY `products_category_id_fk` (`category_id`),
    CONSTRAINT `products_category_id_fk` FOREIGN KEY (`category_id`)
        REFERENCES `categories` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `products`
--

INSERT INTO `products` VALUES (1,'Moto G100','moto-g100','Moto G100',0,1,1,'2022-01-31 20:58:02','2022-02-01 14:23:27',NULL),(2,'Moto G60','moto-g60','Moto G60',1,1,1,'2022-02-01 19:25:28','2022-02-01 19:25:28',NULL);

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `properties_deleted_at_idx` (`deleted_at`),
    UNIQUE KEY `properties_title_idx` (`title`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` VALUES (1,'Brand',NULL),(2,'Model',NULL);

--
-- Table structure for table `product_property_values`
--

CREATE TABLE `product_property_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `property_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `product_property_values_idx` (`product_id`, `property_id`),
    KEY `product_property_values_product_fk` (`product_id`),
    CONSTRAINT `product_property_values_product_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`),
    KEY `product_property_values_property_fk` (`property_id`),
    CONSTRAINT `product_property_values_property_fk` FOREIGN KEY (`property_id`)
        REFERENCES `properties` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `product_property_values`
--

INSERT INTO `product_property_values` VALUES (1,'Motorola',1,1),(2,'Moto G100',1,2),(4,'Motorola',2,1),(5,'Moto G60',2,2);

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(64) NOT NULL,
    `price` DECIMAL(5,2) NOT NULL DEFAULT '0',
    `compared_at_price` DECIMAL(5,2) NOT NULL DEFAULT '0',
    `cost_per_item` DECIMAL(5,2) NOT NULL DEFAULT '0',
    `quantity_on_stock` INT UNSIGNED NOT NULL DEFAULT '0',
    `product_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `variants_product_id_fk` (`product_id`),
    UNIQUE KEY `variants_sku_idx` (`sku`),
    CONSTRAINT `variants_product_id_fk` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` VALUES (1,'motog100nimbusblue',500,0,400,23,1),(2,'motog100borealgreen',479,0,400,34,1),(3,'motog60blue',248,0,200,78,2);

--
-- Table structure for table `variant_images`
--

CREATE TABLE `variant_images` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(128) NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `variant_images_url_idx` (`url`),
    KEY `variant_images_variant_id_fk` (`variant_id`),
    CONSTRAINT `variant_images_variant_id_fk` FOREIGN KEY (`variant_id`)
        REFERENCES `variants` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `variant_images`
--

INSERT INTO `variant_images` VALUES (1,'motog100nimbusblue.jpg',1),(2,'motog100borealgreen.jpg',2),(3,'motog60blue.jpg',3);

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `deleted_at` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `attributes_deleted_at_idx` (`deleted_at`),
    UNIQUE KEY `attributes_title_idx` (`title`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` VALUES (1,'Color',NULL),(2,'Storage',NULL);

--
-- Table structure for table `variant_attribute_values`
--

CREATE TABLE `variant_attribute_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    `attribute_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `variant_attribute_values_idx` (`variant_id`, `attribute_id`),
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

INSERT INTO `variant_attribute_values` VALUES (1,'Blue Nimbus',1,1),(2,'Boreal Green',2,1),(3,'Blue',3,1),(4,'128gb',1,2),(5,'128gb',2,2),(6,'128gb',3,2);

--
-- Table structure for table `movement_types`
--

CREATE TABLE `movement_types` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `movement_types_title_idx` (`title`)
)  ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `movement_types`
--

INSERT INTO `movement_types` VALUES (1,'In'),(2,'Out');

--
-- Table structure for table `movements`
--

CREATE TABLE `movements` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `movement_type_id` TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `movement_title_idx` (`title`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

--
-- Dumping data for table `movements`
--

INSERT INTO `movements` VALUES (1,'Inital product registration',1),(2,'Inventory reception',1),(3,'Sale',2);

--
-- Table structure for table `inventory_movements`
--

CREATE TABLE `inventory_movements` (
    `id` BIGINT UNSIGNED NOT NULL,
    `quantity` INT NOT NULL DEFAULT '0',
    `variant_id` BIGINT UNSIGNED NOT NULL,
    `movement_id` TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `inventory_movements_variant_id_fk_idx` (`variant_id`),
    KEY `inventory_movements_movement_id_fk` (`movement_id`),
    CONSTRAINT `inventory_movements_movement_id_fk` FOREIGN KEY (`movement_id`)
        REFERENCES `movements` (`id`),
    CONSTRAINT `inventory_movements_variant_id_fk` FOREIGN KEY (`variant_id`)
        REFERENCES `variants` (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;
