-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2021 at 08:18 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admassistant_payments`
--

CREATE TABLE `admassistant_payments` (
  `admassispayment_id` int(11) NOT NULL,
  `month` varchar(150) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `comission_payment` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `payment_type` varchar(150) NOT NULL,
  `deposit_date` date NOT NULL,
  `voucher_url` text NOT NULL,
  `assistantAdmId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admassistant_payments`
--

INSERT INTO `admassistant_payments` (`admassispayment_id`, `month`, `salary`, `comission_payment`, `total`, `payment_type`, `deposit_date`, `voucher_url`, `assistantAdmId`) VALUES
(1, 'JANUARY', '1500', '200', '1300', 'Bank Transfer', '2021-10-10', 'http://localhost/api-proyecto-arturo/Files/vouchers/assistants/upload_978368150.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `adminId` int(11) UNSIGNED NOT NULL,
  `userName` varchar(500) NOT NULL,
  `lastName` varchar(500) NOT NULL,
  `cellphone` char(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`adminId`, `userName`, `lastName`, `cellphone`, `address`, `email`, `password`) VALUES
(1, 'jesus', 'xd', '987654321', 'av talara', 'jesusp@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `assitantadm`
--

CREATE TABLE `assitantadm` (
  `assistantAdmId` int(11) NOT NULL,
  `userName` varchar(500) NOT NULL,
  `lastName` varchar(500) NOT NULL,
  `cellphone` char(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `acc_state` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assitantadm`
--

INSERT INTO `assitantadm` (`assistantAdmId`, `userName`, `lastName`, `cellphone`, `address`, `email`, `password`, `acc_state`) VALUES
(1, 'assistant123', 'tewst4', '734223', 'Av', 'pedro@gmail.com', 'pedro123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `callcenter`
--

CREATE TABLE `callcenter` (
  `callCenterId` int(11) NOT NULL,
  `userName` varchar(500) NOT NULL,
  `lastName` varchar(500) NOT NULL,
  `cellphone` char(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `workingHours` int(11) NOT NULL,
  `monthlySalary` decimal(8,2) NOT NULL,
  `extraAllocation` decimal(8,2) NOT NULL,
  `password` varchar(500) NOT NULL,
  `acc_state` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `callcenter`
--

INSERT INTO `callcenter` (`callCenterId`, `userName`, `lastName`, `cellphone`, `address`, `email`, `workingHours`, `monthlySalary`, `extraAllocation`, `password`, `acc_state`) VALUES
(1, 'pablo', 'quefue', '1234123', 'av pablo', 'pablo@gmail.com', 7, '1500.00', '150.00', '1234', 1),
(2, 'pedro', 'asdsa', '123456789', 'av test', 'test@gmail.com', 5, '1000.00', '200.00', '1234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `callcenter_payments`
--

CREATE TABLE `callcenter_payments` (
  `callcenterpayment_id` int(11) NOT NULL,
  `month` varchar(150) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `comission_payment` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `payment_type` varchar(150) NOT NULL,
  `deposit_date` date NOT NULL,
  `voucher_url` text NOT NULL,
  `callCenterId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `callcenter_payments`
--

INSERT INTO `callcenter_payments` (`callcenterpayment_id`, `month`, `salary`, `comission_payment`, `total`, `payment_type`, `deposit_date`, `voucher_url`, `callCenterId`) VALUES
(1, 'APRIL', '1500', '15', '2000', 'Credit Card', '2021-04-18', 'http://localhost/api-proyecto-arturo/Files/vouchers/callcenters/upload_182813394.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `clientId` int(11) NOT NULL,
  `userName` varchar(500) NOT NULL,
  `lastName` varchar(500) NOT NULL,
  `cellphone` char(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `impactWindow` tinyint(1) NOT NULL,
  `panelSolar` tinyint(1) NOT NULL,
  `marmol` tinyint(1) NOT NULL,
  `remodeling` tinyint(1) NOT NULL,
  `acc_state` tinyint(1) DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  `zone` varchar(150) DEFAULT NULL,
  `state` varchar(150) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`clientId`, `userName`, `lastName`, `cellphone`, `address`, `email`, `password`, `impactWindow`, `panelSolar`, `marmol`, `remodeling`, `acc_state`, `reg_date`, `zone`, `state`, `notes`) VALUES
(1, 'artura', 'andrea', '123', 'av tu test', 'test@gmail.com', 'test123', 1, 1, 0, 1, 1, '2021-04-13', 'West Palm Beach', 'Marketing', 'this user is in zone1'),
(2, 'andrea', 'dasdasd', 'asdas', 'dasda', 'asdadsaa@gmail.com', '1231', 0, 0, 1, 1, 1, '2021-04-13', 'Broward', 'Assigned', 'this user is in zone2'),
(3, 'david', 'asdasd', 'asdasdas', 'piura', 'dasdasd@gmail.com', 'asdasd', 1, 1, 0, 1, 1, '2021-04-13', 'Broward', 'In Process', 'this user is in zone3'),
(4, 'david', 'sdsad', 'sdasd', 'lima', 'asd@gmail.com', 'asdsa', 1, 0, 0, 0, 1, '2021-04-13', 'Broward', 'Concluded', ''),
(5, 'pedro', 'dasd', 'sdas', 'piura', 'asdasda@gmail.com', 'dasd', 1, 0, 0, 1, 0, '2021-04-13', 'Miami Dade', 'Not Worked', ''),
(6, 'dasda', 'asdas', 'asd', 'piura', 'sadasd@gmail.com', 'asd', 0, 1, 0, 0, 0, '2021-04-13', 'Miami Dade', 'Not Worked', ''),
(8, 'kfue', 'aeabro', '1412421', 'asdasdasd', 'asdasdasd@gmail.com', '123', 1, 0, 1, 0, 0, NULL, NULL, '', ''),
(9, 'asdasd', 'asdasd', '1231232', 'asdasdas', 'asdasda@gmail.com', '123123', 0, 0, 0, 1, 0, NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `client_quote`
--

CREATE TABLE `client_quote` (
  `client_quoteId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `cotizadorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cotizador`
--

CREATE TABLE `cotizador` (
  `cotizadorId` int(11) NOT NULL,
  `userName` varchar(500) NOT NULL,
  `lastName` varchar(500) NOT NULL,
  `cellphone` char(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `asignation` decimal(8,2) NOT NULL,
  `type` varchar(150) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `company` varchar(150) DEFAULT NULL,
  `acc_state` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cotizador`
--

INSERT INTO `cotizador` (`cotizadorId`, `userName`, `lastName`, `cellphone`, `address`, `email`, `asignation`, `type`, `password`, `company`, `acc_state`) VALUES
(1, 'juan', 'kfue', '12345', 'av juan', 'juan@gmail.com', '150.00', 'External', '1234', 'test', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notificationId` int(11) NOT NULL,
  `userType` varchar(150) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `providersId` int(11) NOT NULL,
  `company` varchar(500) NOT NULL,
  `serviceType` varchar(500) NOT NULL,
  `address` varchar(500) NOT NULL,
  `cellphone` char(12) NOT NULL,
  `email` varchar(500) NOT NULL,
  `managerOrOwner` varchar(500) DEFAULT NULL,
  `operationalStaff` varchar(500) NOT NULL,
  `commissionEstablished` decimal(8,2) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `acc_state` tinyint(1) DEFAULT NULL,
  `provider_state` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`providersId`, `company`, `serviceType`, `address`, `cellphone`, `email`, `managerOrOwner`, `operationalStaff`, `commissionEstablished`, `password`, `acc_state`, `provider_state`) VALUES
(1, 'prov-test', 'Panel Solar', 'av test', '123456789', 'testprov@gmail.com', 'juan', 'nidea:v2', '1500.00', '123', 1, 'Process Concluded'),
(2, 'prov2', 'Remodeling', 'av test', '123456789', 'testprov2@gmail.com', 'test', 'testxd', '1500.00', '123', 1, 'Quotation');

-- --------------------------------------------------------

--
-- Table structure for table `provider_client`
--

CREATE TABLE `provider_client` (
  `provider_clientId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `providersId` int(11) NOT NULL,
  `assign_date` date NOT NULL,
  `service_state` tinyint(1) NOT NULL,
  `callCenterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provider_client`
--

INSERT INTO `provider_client` (`provider_clientId`, `clientId`, `providersId`, `assign_date`, `service_state`, `callCenterId`) VALUES
(6, 1, 1, '2021-04-16', 0, 1),
(11, 6, 2, '2021-04-24', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `provider_payments`
--

CREATE TABLE `provider_payments` (
  `providerpayment_id` int(11) NOT NULL,
  `month` varchar(150) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `comission_payment` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `payment_type` varchar(150) NOT NULL,
  `deposit_date` date NOT NULL,
  `voucher_url` text NOT NULL,
  `providersId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provider_payments`
--

INSERT INTO `provider_payments` (`providerpayment_id`, `month`, `salary`, `comission_payment`, `total`, `payment_type`, `deposit_date`, `voucher_url`, `providersId`) VALUES
(1, 'JANUARY', '1500', '1500', '1500', 'Bank Transfer', '2021-10-10', 'http://localhost/api-proyecto-arturo/Files/vouchers/providers/upload_242360043.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `quoteid` int(11) NOT NULL,
  `url` text NOT NULL,
  `clientId` int(11) NOT NULL,
  `num` char(14) DEFAULT NULL,
  `name` text DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`quoteid`, `url`, `clientId`, `num`, `name`, `state`) VALUES
(1, 'http://localhost/api-proyecto-arturo/Files/documents/N1618551968845.pdf', 1, 'N1618551968845', 'EV_CONTINUA_2.pdf', 1),
(4, 'http://localhost/api-proyecto-arturo/Files/documents/1618533988692.jpeg', 4, 'N1618533988692', '{FFBACEF2-7671-4563-86E6-AB5925FC9009}.png.jpg', 1),
(5, 'http://localhost/api-proyecto-arturo/Files/documents/1618534629125.jpeg', 3, 'N1618534629125', '1_020119.jpg', 1),
(6, 'http://localhost/api-proyecto-arturo/Files/documents/N1618551761422.jpeg', 1, 'N1618551761422', '71KV0V8AxbL._AC_SX569_.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quote_payments`
--

CREATE TABLE `quote_payments` (
  `quotepayment_id` int(11) NOT NULL,
  `month` varchar(150) NOT NULL,
  `comission_payment` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `payment_type` varchar(150) NOT NULL,
  `deposit_date` date NOT NULL,
  `voucher_url` text NOT NULL,
  `cotizadorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quote_payments`
--

INSERT INTO `quote_payments` (`quotepayment_id`, `month`, `comission_payment`, `total`, `payment_type`, `deposit_date`, `voucher_url`, `cotizadorId`) VALUES
(1, 'JANUARY', '15', '15', 'test', '2021-10-10', 'http://localhost/api-proyecto-arturo/Files/vouchers/quoters/upload_583409218.jpg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admassistant_payments`
--
ALTER TABLE `admassistant_payments`
  ADD PRIMARY KEY (`admassispayment_id`),
  ADD KEY `assistantAdmId` (`assistantAdmId`);

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `assitantadm`
--
ALTER TABLE `assitantadm`
  ADD PRIMARY KEY (`assistantAdmId`);

--
-- Indexes for table `callcenter`
--
ALTER TABLE `callcenter`
  ADD PRIMARY KEY (`callCenterId`);

--
-- Indexes for table `callcenter_payments`
--
ALTER TABLE `callcenter_payments`
  ADD PRIMARY KEY (`callcenterpayment_id`),
  ADD KEY `callCenterId` (`callCenterId`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientId`);

--
-- Indexes for table `client_quote`
--
ALTER TABLE `client_quote`
  ADD PRIMARY KEY (`client_quoteId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `cotizadorId` (`cotizadorId`);

--
-- Indexes for table `cotizador`
--
ALTER TABLE `cotizador`
  ADD PRIMARY KEY (`cotizadorId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notificationId`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`providersId`);

--
-- Indexes for table `provider_client`
--
ALTER TABLE `provider_client`
  ADD PRIMARY KEY (`provider_clientId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `providersId` (`providersId`),
  ADD KEY `provider_client_ibfk_3` (`callCenterId`);

--
-- Indexes for table `provider_payments`
--
ALTER TABLE `provider_payments`
  ADD PRIMARY KEY (`providerpayment_id`),
  ADD KEY `providersId` (`providersId`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`quoteid`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `quote_payments`
--
ALTER TABLE `quote_payments`
  ADD PRIMARY KEY (`quotepayment_id`),
  ADD KEY `cotizadorId` (`cotizadorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admassistant_payments`
--
ALTER TABLE `admassistant_payments`
  MODIFY `admassispayment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `adminId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assitantadm`
--
ALTER TABLE `assitantadm`
  MODIFY `assistantAdmId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `callcenter`
--
ALTER TABLE `callcenter`
  MODIFY `callCenterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `callcenter_payments`
--
ALTER TABLE `callcenter_payments`
  MODIFY `callcenterpayment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `clientId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `client_quote`
--
ALTER TABLE `client_quote`
  MODIFY `client_quoteId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cotizador`
--
ALTER TABLE `cotizador`
  MODIFY `cotizadorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notificationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `providersId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `provider_client`
--
ALTER TABLE `provider_client`
  MODIFY `provider_clientId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `provider_payments`
--
ALTER TABLE `provider_payments`
  MODIFY `providerpayment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quoteid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quote_payments`
--
ALTER TABLE `quote_payments`
  MODIFY `quotepayment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admassistant_payments`
--
ALTER TABLE `admassistant_payments`
  ADD CONSTRAINT `admassistant_payments_ibfk_1` FOREIGN KEY (`assistantAdmId`) REFERENCES `assitantadm` (`assistantAdmId`);

--
-- Constraints for table `callcenter_payments`
--
ALTER TABLE `callcenter_payments`
  ADD CONSTRAINT `callcenter_payments_ibfk_1` FOREIGN KEY (`callCenterId`) REFERENCES `callcenter` (`callCenterId`);

--
-- Constraints for table `client_quote`
--
ALTER TABLE `client_quote`
  ADD CONSTRAINT `client_quote_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`),
  ADD CONSTRAINT `client_quote_ibfk_2` FOREIGN KEY (`cotizadorId`) REFERENCES `cotizador` (`cotizadorId`);

--
-- Constraints for table `provider_client`
--
ALTER TABLE `provider_client`
  ADD CONSTRAINT `provider_client_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`),
  ADD CONSTRAINT `provider_client_ibfk_2` FOREIGN KEY (`providersId`) REFERENCES `providers` (`providersId`),
  ADD CONSTRAINT `provider_client_ibfk_3` FOREIGN KEY (`callCenterId`) REFERENCES `callcenter` (`callCenterId`);

--
-- Constraints for table `provider_payments`
--
ALTER TABLE `provider_payments`
  ADD CONSTRAINT `provider_payments_ibfk_1` FOREIGN KEY (`providersId`) REFERENCES `providers` (`providersId`);

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`);

--
-- Constraints for table `quote_payments`
--
ALTER TABLE `quote_payments`
  ADD CONSTRAINT `quote_payments_ibfk_1` FOREIGN KEY (`cotizadorId`) REFERENCES `cotizador` (`cotizadorId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
