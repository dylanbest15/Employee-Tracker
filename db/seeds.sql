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
