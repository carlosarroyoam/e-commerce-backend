CREATE DATABASE IF NOT EXISTS `nodejs_api`;

USE `nodejs_api`;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;

CREATE TABLE user_roles (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` VALUES (1, 'App/Admin'), (2, 'App/Customer');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(75) NOT NULL,
  `user_role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_idx` (`email`),
  FOREIGN KEY (user_role_id)
        REFERENCES user_roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'Carlos Alberto', 'Arroyo Martínez', 'carlosarroyo@gmail.com', '$2b$10$vNVtCVv7IxX1Q9Whwb//ie6SZROFY4IYcDOSn146SWph8UBEzSYte', 1, '2021-07-02 14:39:11', '2021-07-02 14:51:56', NULL);

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
	`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
	`is_super` tinyint NOT NULL DEFAULT 0,
	`user_id` bigint UNSIGNED NOT NULL,
	PRIMARY KEY (`id`),
	  FOREIGN KEY (user_id)
			REFERENCES users(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `is_super`, `user_id`) VALUES (1, 1, 1);