CREATE DATABASE  IF NOT EXISTS `nodejs_api`;

USE `nodejs_api`;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;

CREATE TABLE user_roles (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(75) NOT NULL,
  `user_role_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_idx` (`email`),
  INDEX user_role_id_fk (user_role_id),
  FOREIGN KEY (user_role_id)
        REFERENCES user_roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
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
	`id` int NOT NULL AUTO_INCREMENT,
	`is_super` tinyint NOT NULL DEFAULT 0,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`),
	  FOREIGN KEY (user_id)
			REFERENCES users(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
