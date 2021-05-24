--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  UNIQUE KEY `email` (`email`) /*!80000 INVISIBLE */,
  UNIQUE KEY `userable` (`userable_type`,`userable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users`(`id`, `first_name`, `last_name`, `email`, `password`, `userable_type`, `userable_id`) VALUES (1,'Carlos Alberto','Arroyo Martínez','carlosarroyo@gmail.com', '$2b$10$UkLqEOO/wrjWxKao4PqgEe68DesQEpvTfags.dYISmxWC.beeflv.', 'App/Admin', '1'),(2,'Stefania','Guido Rojas','stefaniaguido@gmail.com', '$2b$10$UkLqEOO/wrjWxKao4PqgEe68DesQEpvTfags.dYISmxWC.beeflv.', 'App/Client', '1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
