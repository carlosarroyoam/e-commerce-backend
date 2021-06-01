CREATE DATABASE  IF NOT EXISTS `nodejs_api`;

USE `nodejs_api`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_super` tinyint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` VALUES (1,1,1);

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_customer_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` VALUES (1,2);

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
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
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `userable` (`userable_type`,`userable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES (1,'Carlos Alberto','Arroyo Martínez','carlosarroyo@gmail.com','$2b$10$oUqnuDttgWHrlmlMYubTduruAcwwelzG9D79HuIUR7o8Gdf29RQ5e','App/Admin',1,'2021-05-24 16:06:42','2021-06-01 14:44:06',NULL),(2,'Stefania','Guido Rojas','stefaniaguido@gmail.com','$2b$10$BwZz3JuHTcb1ZAhAofyXQ.FnuuTJqGQfGF5PBmandiJVbacteqPOG','App/Customer',1,'2021-05-24 16:06:42','2021-06-01 16:07:25',NULL);
