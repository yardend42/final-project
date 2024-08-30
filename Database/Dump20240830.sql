-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `fk_vacationid_idx` (`vacation_id`),
  CONSTRAINT `fk_userid` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vacationid` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (5,1),(9,1),(9,3),(23,3),(1,4),(25,4),(23,5),(9,6),(1,7),(9,7),(9,8),(9,9),(25,9),(9,10),(9,11),(9,36),(25,40),(9,50);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yarden','dickshtein','yarden@email.com','12345','admin'),(5,'donna','dale','donna@email.com','225566','user'),(9,'mera','dale','mera.d@email.com','8855','user'),(11,'dorra','kale','dorra.d@email.com','6161','user'),(13,'dorra','kale','dorraa.d@email.com','8888','user'),(14,'barak','obama','barak@gmail.com','11111','user'),(16,'tali','namn','tali@mail.com','11111','user'),(17,'matilda','bear','m.bear@mail.com','.2255','user'),(18,'tony','male','tony@male.il','6545','user'),(19,'user','user','user@e.k','78945','user'),(20,'user','usser','user@lijwd.skdf','3662','user'),(21,'jjh','ml;','543@k.k','1354','user'),(22,'lkfhs',',kn','khv@kh.ee','88888','user'),(23,'check','nomass','fff@5.5','5466','user'),(25,'yarden@email.com','yarden@email.com','yarden@email.comk','35438','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_filename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Paris','Romantic getaway in Paris','2024-07-31','2024-08-09',1200.00,'paris.jpg'),(3,'Hawaii','Relax on the stunning beaches of Hawaii','2024-08-31','2024-09-09',1500.00,'hawaii.jpg'),(4,'Santorini','Experience the charm of Santorini','2024-09-20','2024-09-30',1400.00,'santorini.jpg'),(5,'Maldives','Luxury stay in the Maldives','2024-10-05','2024-10-15',2500.00,'maldives.jpg'),(6,'Maui','Adventure and relaxation in Maui','2024-10-20','2024-10-30',1700.00,'maui.jpg'),(7,'Venice','Gondola rides and stunning architecture','2024-11-01','2024-11-10',1600.00,'venice.jpg'),(8,'Bora Bora','Exclusive stay in Bora Bora','2024-11-15','2024-11-25',2800.00,'bora-bora.jpg'),(9,'Phuket','Explore the beaches and nightlife of Phuket','2024-12-01','2024-12-10',1200.00,'thailand.jpg'),(10,'Iceland','Witness the Northern Lights in Iceland','2024-12-20','2024-12-30',2200.00,'iceland.jpg'),(11,'Kyoto','Discover the culture and temples of Kyoto','2025-01-05','2025-01-15',1800.00,'kyoto.jpg'),(12,'Rio de Janeiro','Enjoy the vibrant culture of Rio','2025-01-20','2025-01-30',1500.00,'Rio.jpg'),(13,'Fiji','Relax in the tropical paradise of Fiji','2025-02-05','2025-02-15',2300.00,'fiji.jpg'),(14,'Cape Town','Explore the beauty of Cape Town','2025-02-20','2025-03-02',1900.00,'cape-town.jpg'),(15,'Tahiti','Experience the tranquility of Tahiti','2025-03-10','2025-03-20',2400.00,'tahiti.jpg'),(19,'Greece','Enjoy the beautiful beaches and ancient ruins of Athens','2024-07-01','2024-07-10',2500.00,'athens.jpg'),(25,'France','Stroll through the romantic streets of Paris','2024-05-15','2024-05-25',3200.00,'paris.jpg'),(36,'isreal','war time','2024-07-27','2024-07-31',5555.00,'isreal.jpg'),(40,'usa','Stroll through the romantic streets of Paris','2024-11-29','2024-11-25',3200.00,'paris.jpg'),(50,'tokyo','nigth life in tokyo','2024-10-19','2024-11-12',9599.00,'ea585b1b-b485-4745-9043-321333006ca2.jpg'),(51,'thailand','go see the tempels','2024-08-30','2024-08-31',8888.00,'0a0568b4-680c-497e-b957-89876cac3719.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-30 15:54:19
