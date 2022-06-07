/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 10.6.8-MariaDB : Database - prueba-node
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`prueba-node` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci */;

USE `prueba-node`;

/*Table structure for table `adns` */

DROP TABLE IF EXISTS `adns`;

CREATE TABLE `adns` (
  `idAdn` bigint(134) NOT NULL AUTO_INCREMENT,
  `adn` varchar(1000) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `tipo` int(1) DEFAULT 0,
  `fecha` date DEFAULT current_timestamp(),
  PRIMARY KEY (`idAdn`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

/*Data for the table `adns` */

insert  into `adns`(`idAdn`,`adn`,`tipo`,`fecha`) values (95,'[\"CGTACG\",\"CCAAAG\",\"AGACAA\",\"CTCGGC\",\"CGGGGG\",\"CCAGCG\"]',0,'2022-06-07'),(96,'[\"CAAATAAAT\",\"GCACAGATC\",\"CGATAACAA\",\"TTACAGGCC\",\"TACTCCTGT\",\"ATTGCGGAA\",\"AGTGGTACG\",\"AGGGGTTTC\",\"GATCGGAGT\"]',1,'2022-06-07'),(97,'[\"CCATGAGAT\",\"TACTCCGAG\",\"ACTGTTGTT\",\"CACACGACA\",\"GTCTGGCAA\",\"CGCTCCAGC\",\"CCGTGTGTA\",\"AGTGGGAAC\",\"TATCAGGTG\"]',0,'2022-06-07'),(98,'[\"AAAAGCGCT\",\"AGTGGCTTG\",\"TAACGGAAT\",\"ACTTAGATA\",\"CAACAGTAT\",\"CTTGAGTCG\",\"TTAGTGCCC\",\"ATATACCTC\",\"GACTGCTCA\"]',1,'2022-06-07'),(99,'[\"GGTCGT\",\"CGTGTA\",\"CGGCTG\",\"ACGGTG\",\"ACTCAG\",\"CATACG\"]',1,'2022-06-07'),(100,'[\"TTGT\",\"CTCA\",\"CGTC\",\"CCCC\"]',0,'2022-06-07'),(101,'[\"TAGAC\",\"AATGA\",\"GACGA\",\"AACAA\",\"CAGTT\"]',0,'2022-06-07'),(102,'[\"TTAT\",\"AGAT\",\"GCCC\",\"TTGG\"]',0,'2022-06-07'),(103,'[\"TCCAAGGAC\",\"ATCCTTCGA\",\"GAGTCTTAC\",\"GTACGTTCA\",\"AGCTGCAGT\",\"GAGGTCTCC\",\"GGGCATTTT\",\"CGGAAGTTT\",\"AGAGCATCC\"]',1,'2022-06-07'),(104,'[\"CGTGCAG\",\"TACGTCA\",\"GACGGTA\",\"GATCGGC\",\"TTCGCTA\",\"CCCCATC\",\"TTAAACG\"]',0,'2022-06-07'),(105,'[\"GAAAGTTA\",\"GCTTTTTT\",\"TTTTGTCT\",\"GTGTATCT\",\"ACGAATTT\",\"TCACTATG\",\"GTCAATAA\",\"TCCAGAGT\"]',1,'2022-06-07'),(106,'[\"TCTGACCGG\",\"AAAGGTCAC\",\"GTCCTTCGT\",\"TAAACATGC\",\"ACCTCCGGG\",\"CACCATAGA\",\"ACCATACTC\",\"GCTAAGGTT\",\"TGAGAGGGG\"]',1,'2022-06-07'),(107,'[\"AAGCGC\",\"GAAGTG\",\"TGGCAG\",\"CCTAGC\",\"GTTTTT\",\"TTCTTG\"]',0,'2022-06-07'),(108,'[\"CGGTTA\",\"TTCTCA\",\"TGTGCT\",\"ACTACA\",\"AGACAC\",\"TACCGT\"]',0,'2022-06-07'),(109,'[\"CGTTC\",\"CAACC\",\"GTCTA\",\"ATGCA\",\"CCCTG\"]',0,'2022-06-07'),(110,'[\"CATCACC\",\"CAATGCG\",\"GAACCGA\",\"TGTGATG\",\"TTTTAGC\",\"GTCTCTC\",\"CGCTCGC\"]',0,'2022-06-07'),(111,'[\"CTCTTT\",\"AGATGG\",\"ATAGGT\",\"TAACGC\",\"GTTTTT\",\"TCATAA\"]',0,'2022-06-07'),(112,'[\"TGGACTT\",\"TGTACGG\",\"AGCGTAG\",\"GAGAATT\",\"CCAACTA\",\"AACGTAC\",\"AGCGTTT\"]',0,'2022-06-07'),(113,'[\"GGGGTGA\",\"ATTCGGA\",\"ACGCCCT\",\"ATATACT\",\"TAACCTT\",\"TACGTCA\",\"TCACGTT\"]',0,'2022-06-07'),(114,'[\"AGAA\",\"ATCT\",\"AAAC\",\"TAAA\"]',0,'2022-06-07'),(115,'[\"GGCATA\",\"TTGTCC\",\"CGTAAA\",\"CGCTGT\",\"AGCGAG\",\"AATAGG\"]',0,'2022-06-07'),(116,'[\"TAGCGGC\",\"TTCCATC\",\"CCCTACC\",\"TTTCCTC\",\"TTGGGGA\",\"TTGCGTT\",\"ACGGGCG\"]',1,'2022-06-07'),(117,'[\"ATGAGCG\",\"AATTCTT\",\"CTGCATA\",\"TGTGCGG\",\"CTACACA\",\"AGTTTAC\",\"AGCCCTT\"]',0,'2022-06-07'),(118,'[\"CTCTA\",\"CACCG\",\"TGCTA\",\"TTACA\",\"GCCCA\"]',0,'2022-06-07');

/* Procedure structure for procedure `SP_DT_ADN` */

/*!50003 DROP PROCEDURE IF EXISTS  `SP_DT_ADN` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `SP_DT_ADN`()
BEGIN
  
	DELETE FROM `adns`;
  
END */$$
DELIMITER ;

/* Procedure structure for procedure `SP_IN_REGISTRO_ADN` */

/*!50003 DROP PROCEDURE IF EXISTS  `SP_IN_REGISTRO_ADN` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `SP_IN_REGISTRO_ADN`(p_adn VARCHAR(1000), p_tipo int(1))
BEGIN
  
  DECLARE rp_idAdn BIGINT;
  
  select idAdn INTO rp_idAdn from adns where adn = p_adn LIMIT 1;
  
  IF rp_idAdn IS NULL then
	INSERT INTO adns SET adn = p_adn, `tipo` = p_tipo;
	SELECT 1 AS RESULT FROM ADNS LIMIT 1;
  ELSE
	SELECT 0 AS RESULT FROM ADNS LIMIT 1;
  end if;
   
END */$$
DELIMITER ;

/* Procedure structure for procedure `SP_RP_ADN` */

/*!50003 DROP PROCEDURE IF EXISTS  `SP_RP_ADN` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `SP_RP_ADN`()
BEGIN
  
   SELECT 
  (SELECT IFNULL(COUNT(*),0) FROM `adns` WHERE tipo = 1) AS count_mutations, 
  (SELECT IFNULL(COUNT(*),0) FROM `adns` WHERE tipo = 0) AS count_no_mutation,
  IFNULL((SELECT COUNT(*) FROM `adns` WHERE tipo = 1) / (SELECT COUNT(*) FROM `adns` WHERE tipo = 0),0)  AS ratio
  FROM adns 
  LIMIT 1;
  
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
