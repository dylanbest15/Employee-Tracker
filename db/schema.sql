/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `employee_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `employee_tracker`;

CREATE TABLE IF NOT EXISTS `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`id`, `name`) VALUES
	(6, 'Sales'),
	(7, 'Marketing'),
	(8, 'Accounting'),
	(9, 'Human Resources'),
	(10, 'Technology'),
	(11, 'Production'),
	(12, 'IT'),
	(13, 'Social Media'),
	(14, 'Special Dep'),
	(15, 'Test Dep');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_id` int NOT NULL DEFAULT '0',
  `manager_id` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK__role` (`role_id`),
  KEY `FK_employee_employee` (`manager_id`),
  CONSTRAINT `FK__role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_employee_employee` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
	(12, 'Patrick', 'Star', 9, NULL),
	(13, 'Milo', 'Bango', 7, 12),
	(14, 'Dylan', 'Best', 12, NULL),
	(15, 'Homer', 'Simpson', 4, 12),
	(16, 'Toph', 'Beifong', 14, 14),
	(17, 'Abby', 'Bomberger', 9, 14),
	(18, 'Jimmy', 'Neutron', 13, 17),
	(19, 'Danny', 'Phantom', 5, 15),
	(20, 'Harry', 'Potter', 3, 12),
	(21, 'Ron', 'Weasley', 7, NULL),
	(22, 'Bob', 'Burger', 4, 14),
	(24, 'Spongebob', 'Squarepants', 7, 12);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salary` decimal(10,0) NOT NULL DEFAULT '0',
  `department_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK__department` (`department_id`),
  CONSTRAINT `FK__department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `title`, `salary`, `department_id`) VALUES
	(3, 'Sales Representative', 50000, 6),
	(4, 'Account Executive', 80000, 6),
	(5, 'Marketing Analyst', 65000, 7),
	(6, 'Director of Marketing', 135000, 7),
	(7, 'Junior Accountant', 55000, 8),
	(8, 'Senior Accountant', 105000, 8),
	(9, 'Employee Advocate', 45000, 9),
	(10, 'Strategic Partner', 75000, 9),
	(11, 'Business Analyst', 85000, 10),
	(12, 'Software Developer', 120000, 10),
	(13, 'Assistant Director', 100000, 11),
	(14, 'Cinematographer', 60000, 11),
	(15, 'Manager', 5, 12),
	(16, 'Content Creator', 35000, 13),
	(17, 'Special Role', 200000, 14),
	(18, 'Test Role', 500000, 15);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
