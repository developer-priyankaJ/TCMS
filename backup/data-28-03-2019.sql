-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: tcms
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transportentry`
--

DROP TABLE IF EXISTS `transportentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transportentry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(45) NOT NULL,
  `bill_date` date DEFAULT NULL,
  `party` int(11) DEFAULT NULL,
  `item_desc` varchar(225) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `cgst` varchar(45) DEFAULT NULL,
  `sgst` varchar(45) DEFAULT NULL,
  `igst` varchar(45) DEFAULT NULL,
  `total` varchar(45) DEFAULT NULL,
  `transporter` int(11) DEFAULT NULL,
  `lr_no` varchar(45) DEFAULT NULL,
  `booking_stn` varchar(45) DEFAULT NULL,
  `eway_no` varchar(45) DEFAULT NULL,
  `bilty_date` date DEFAULT NULL,
  `bale_qty` int(10) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `freight` varchar(45) DEFAULT NULL,
  `bale_numbers` varchar(125) DEFAULT NULL,
  `bale_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `invoice_no_UNIQUE` (`invoice_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportentry`
--

LOCK TABLES `transportentry` WRITE;
/*!40000 ALTER TABLE `transportentry` DISABLE KEYS */;
INSERT INTO `transportentry` VALUES (1,' CM-1234','2019-03-21',86,'saree','12300','0','0','1000','13300',9,'12346','833','','2019-03-21',2,'100','1000','123,124','autoIncrement'),(2,'GST/2493','2019-03-28',64,'POPLIN ROSHNI','80885','0','0','4044.25','84929',9,'620487','2562','','2019-03-18',3,'255','1947','15026,15027,15028','autoIncrement');
/*!40000 ALTER TABLE `transportentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baledetails`
--

DROP TABLE IF EXISTS `baledetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baledetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(45) DEFAULT NULL,
  `lr_no` varchar(55) NOT NULL,
  `bale_no` int(22) DEFAULT NULL,
  `bale_desc` varchar(55) DEFAULT NULL,
  `qty` varchar(55) DEFAULT NULL,
  `freight` varchar(55) DEFAULT NULL,
  `received_date` date DEFAULT NULL,
  `sold_date` date DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `status` date DEFAULT NULL,
  `Remarks` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baledetails`
--

LOCK TABLES `baledetails` WRITE;
/*!40000 ALTER TABLE `baledetails` DISABLE KEYS */;
INSERT INTO `baledetails` VALUES (1,' CM-1234','12346',123,'Saree jal nupur ','100','215','2019-03-24',NULL,NULL,NULL,NULL),(2,' CM-1234','12346',124,'Saree Chief Minister','100','222','2019-03-24','2019-03-22',NULL,NULL,'opened'),(3,'GST/2493','620487',15026,'POPLIN ROSHNI','960','28.20','2019-03-26',NULL,NULL,NULL,NULL),(4,'GST/2493','620487',15027,'POPLIN ROSHNI','960','28.20','2019-03-28',NULL,NULL,NULL,NULL),(5,'GST/2493','620487',15028,'POPLIN ROSHNI','960','28.20','2019-03-28',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `baledetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masterpayment`
--

DROP TABLE IF EXISTS `masterpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masterpayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transporter` varchar(100) DEFAULT NULL,
  `bill_date` datetime DEFAULT NULL,
  `mode` varchar(45) DEFAULT NULL,
  `cheque_no` varchar(45) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `tds` varchar(45) DEFAULT NULL,
  `total` varchar(45) DEFAULT NULL,
  `remarks` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masterpayment`
--

LOCK TABLES `masterpayment` WRITE;
/*!40000 ALTER TABLE `masterpayment` DISABLE KEYS */;
INSERT INTO `masterpayment` VALUES (2,'11','2019-01-20 00:00:00','neft','','60000','0','60000','saree'),(3,'9','2019-01-20 00:00:00','neft','','5000','0','5000','hjjhb'),(4,'16','2019-01-20 00:00:00','neft','','50000','500','50500','ghchcb hvgh hvhv hvhv ghvhgv'),(5,'9','2019-03-27 00:00:00','neft','','1000','10','1010','payment'),(6,'9','2019-03-28 00:00:00','neft','','200000','4000','204000','TDS ADDED');
/*!40000 ALTER TABLE `masterpayment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-28 20:09:32
