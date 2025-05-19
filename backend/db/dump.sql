-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: studienprojekt_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendar_events`
--

DROP TABLE IF EXISTS `calendar_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `lecture_id` int DEFAULT NULL,
  `type` enum('exam','lecture','reminder','study') DEFAULT 'reminder',
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_events`
--

LOCK TABLES `calendar_events` WRITE;
/*!40000 ALTER TABLE `calendar_events` DISABLE KEYS */;
INSERT INTO `calendar_events` VALUES (28,'2025-04-15','03:29',1,NULL,'exam','test'),(29,'2025-04-02','05:30',1,NULL,'study','tsetse'),(30,'2025-04-10','',1,NULL,'reminder','test'),(32,'2025-04-11','23:36',1,NULL,'exam','mathe'),(33,'2025-04-16','',1,NULL,'lecture','rest'),(37,'2025-04-11','02:09',1,NULL,'reminder','tset'),(40,'2025-04-11','',1,NULL,'lecture','testtt'),(41,'2025-04-10','',1,NULL,'exam','hh'),(53,'2025-04-19','',1,NULL,'reminder','testt'),(62,'2025-04-17','',1,NULL,'reminder','tezt'),(65,'2025-04-20','23:27',1,NULL,'exam','test'),(72,'2025-04-15','00:26',1,NULL,'exam','test'),(74,'2025-04-24','',1,NULL,'reminder','test'),(76,'2025-04-11','',1,NULL,'reminder','fdafd'),(77,'2025-04-11','',1,NULL,'reminder','fafdaf'),(84,'2025-04-30','',1,NULL,'study','fafg'),(93,'2025-05-06','13:20',1,NULL,'study','hii'),(94,'2025-05-07','',1,NULL,'exam','hs'),(95,'2025-05-08','16:20',1,NULL,'lecture','tsht'),(100,'2025-04-19','',1,NULL,'reminder','dafda'),(103,'2025-04-23','',1,NULL,'study','trewt'),(104,'2025-04-29','16:35',1,NULL,'reminder','djafhdsuiafhb dasuifohbdisauvfbhaiouvfhbauifobhvaoiuwerhvauiodfhjkasvbhfijaoshfuiaepfaew'),(105,'2025-04-25','16:35',1,NULL,'reminder','fsfd'),(107,'2025-05-14','18:03',1,NULL,'lecture','Test'),(108,'2025-05-15','18:07',1,NULL,'exam','Mathe');
/*!40000 ALTER TABLE `calendar_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `room` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES (13,'Betriebssysteme','F01.-111'),(14,'Programmieren','H├Ârsaal 3'),(15,'Informationstechnik','H├Ârsaal 2'),(16,'Softwarearchitektur','F01.015'),(18,'Datenbanken 2','H├Ârsaal 5'),(19,'Parallele und verteilte Systeme','F01.309'),(20,'Digitale Medien','H├Ârsaal 1'),(21,'Mathe','H├Ârsaal 1'),(22,'Sport','Raum 4'),(24,'Mathematik 1B','H├Ârsaal 3'),(25,'Mathematik 2','H├Ârsaal 1');
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes_lectures`
--

DROP TABLE IF EXISTS `notes_lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes_lectures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lecture_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `pdf_url` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes_lectures`
--

LOCK TABLES `notes_lectures` WRITE;
/*!40000 ALTER TABLE `notes_lectures` DISABLE KEYS */;
INSERT INTO `notes_lectures` VALUES (5,10,'dadsa','/usr/src/app/uploads/1745163209615-EXTENSION ACTIVITY BOOK 1A (ENGLISH EDITION).pdf','2025-04-20 15:33:29'),(8,11,'dadsa','/usr/src/app/uploads/1745163712036-vorlesung1 (2).pdf','2025-04-20 15:41:52'),(9,11,'hihi','/usr/src/app/uploads/1745163799160-vorlesung1.pdf','2025-04-20 15:43:19'),(10,10,'ddd','/usr/src/app/uploads/1745163917339-EXTENSION ACTIVITY BOOK 1A (ENGLISH EDITION).pdf','2025-04-20 15:45:17'),(14,11,'fdasfda','/usr/src/app/uploads/1745164974490-vorlesung1 (1).pdf','2025-04-20 16:02:54'),(17,11,'test','/usr/src/app/uploads/1745169145059-PWA_Studienorganisation_Flowchart.pdf','2025-04-20 17:12:25'),(20,9,'test','/usr/src/app/uploads/1745170379075-vorlesung1 (2).pdf','2025-04-20 17:32:59'),(21,9,'tttt','/usr/src/app/uploads/1745170395040-EXTENSION ACTIVITY BOOK 1A (ENGLISH EDITION).pdf','2025-04-20 17:33:15'),(22,9,'bla','/usr/src/app/uploads/1745170503075-vorlesung1 (2).pdf','2025-04-20 17:35:03'),(23,9,'htr','/usr/src/app/uploads/1745170688831-PWA_Studienorganisation_Flowchart.pdf','2025-04-20 17:38:08'),(24,9,'hghf','/usr/src/app/uploads/1745170910288-vorlesung1.pdf','2025-04-20 17:41:50'),(31,12,'Testatdokument','/usr/src/app/uploads/1745577327490-Testatdokument Esra Balci.pdf','2025-04-25 10:35:27'),(32,13,'Immatrikulationsbescheinigung','/usr/src/app/uploads/1745577384108-Immatrikulationsbescheinigung Esra Balci.pdf','2025-04-25 10:36:24'),(33,13,'Test','/usr/src/app/uploads/1745577410836-Informationspsychologie_EsraBalci.pdf','2025-04-25 10:36:50');
/*!40000 ALTER TABLE `notes_lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timetable_entries`
--

DROP TABLE IF EXISTS `timetable_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetable_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `lecture_id` int DEFAULT NULL,
  `weekday` enum('Mo','Di','Mi','Do','Fr') NOT NULL,
  `slot_start` int NOT NULL,
  `slot_end` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `lecture_id` (`lecture_id`),
  CONSTRAINT `timetable_entries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `timetable_entries_ibfk_2` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timetable_entries`
--

LOCK TABLES `timetable_entries` WRITE;
/*!40000 ALTER TABLE `timetable_entries` DISABLE KEYS */;
INSERT INTO `timetable_entries` VALUES (31,1,21,'Do',2,4),(32,1,14,'Fr',6,7),(34,1,20,'Fr',1,2);
/*!40000 ALTER TABLE `timetable_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `to_do`
--

DROP TABLE IF EXISTS `to_do`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `to_do` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `to_do`
--

LOCK TABLES `to_do` WRITE;
/*!40000 ALTER TABLE `to_do` DISABLE KEYS */;
INSERT INTO `to_do` VALUES (23,'Studienprojekt beenden!'),(29,'Lernen!');
/*!40000 ALTER TABLE `to_do` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Esra Demo');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19 17:41:11
