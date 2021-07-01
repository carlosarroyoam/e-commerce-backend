CREATE DATABASE  IF NOT EXISTS `nodejs_api`;

USE `nodejs_api`;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_super` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` VALUES (1,1);

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` VALUES (1);

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(75) NOT NULL,
  `userable_type` varchar(45) NOT NULL,
  `userable_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_idx` (`email`),
  UNIQUE KEY `users_userable_idx` (`userable_id`,`userable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES (1,'Carlos Alberto','Arroyo Martínez','carlosarroyo@gmail.com','$2b$10$oUqnuDttgWHrlmlMYubTduruAcwwelzG9D79HuIUR7o8Gdf29RQ5e','App/Admin',1,'2021-05-24 16:06:42','2021-06-01 14:44:06',NULL),(2,'Stefania','Guido Rojas','stefaniaguido@gmail.com','$2b$10$BwZz3JuHTcb1ZAhAofyXQ.FnuuTJqGQfGF5PBmandiJVbacteqPOG','App/Customer',1,'2021-05-24 16:06:42','2021-06-01 16:07:25',NULL);
