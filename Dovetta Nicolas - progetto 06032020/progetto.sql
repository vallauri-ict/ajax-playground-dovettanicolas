-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 02, 2020 alle 16:24
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `progetto`
--
CREATE DATABASE IF NOT EXISTS `progetto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `progetto`;

-- --------------------------------------------------------

--
-- Struttura della tabella `settimanale`
--

CREATE TABLE `settimanale` (
  `DayId` int(11) NOT NULL,
  `Giorno` text NOT NULL,
  `Antipasto` text NOT NULL DEFAULT '-',
  `Primo` text NOT NULL DEFAULT '-',
  `Secondo` text NOT NULL DEFAULT '-',
  `Dolce` text NOT NULL DEFAULT '-',
  `Email` text NOT NULL,
  `Tipo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `settimanale`
--

INSERT INTO `settimanale` (`DayId`, `Giorno`, `Antipasto`, `Primo`, `Secondo`, `Dolce`, `Email`, `Tipo`) VALUES
(261, 'Lunedì', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(262, 'Martedì', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(263, 'Mercoledì', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(264, 'Sabato', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(265, 'Giovedì', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(266, 'Venerdì', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(267, 'Domenica', '-', '-', '-', '-', 'tester@authorised.this', 'Pranzo'),
(268, 'Lunedì', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(269, 'Martedì', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(270, 'Mercoledì', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(271, 'Giovedì', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(272, 'Venerdì', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(273, 'Sabato', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(274, 'Domenica', '-', '-', '-', '-', 'tester@authorised.this', 'Cena'),
(275, 'Martedì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(276, 'Lunedì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(277, 'Mercoledì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(278, 'Venerdì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(279, 'Giovedì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(280, 'Sabato', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(281, 'Domenica', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Pranzo'),
(282, 'Lunedì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena'),
(283, 'Martedì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena'),
(284, 'Mercoledì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena'),
(285, 'Giovedì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena'),
(286, 'Venerdì', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena'),
(287, 'Sabato', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena'),
(288, 'Domenica', '-', '-', '-', '-', 'nicodovetta@gmail.com', 'Cena');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Telefono` bigint(20) DEFAULT NULL,
  `Indirizzo` text NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`Id`, `Nome`, `Cognome`, `Telefono`, `Indirizzo`, `Email`, `Password`) VALUES
(1, 'Nicolas', 'Bianchi', 3491116472, 'Strada Margaria 18 Busca (CN) 12022', 'nicodovetta@gmail.com', '69e4fec5b0b561e084cee2107afcdf07'),
(2, 'Tester', 'Tester', 1111111111, 'Prova per sviluppatori o visistatori esterni del database', 'tester@authorised.this', '5f4dcc3b5aa765d61d8327deb882cf99'),
(3, 'Prova', 'Prova', 1111111111, 'via 11, comune (CN)', 'prova@prova.it', '5f4dcc3b5aa765d61d8327deb882cf99');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `settimanale`
--
ALTER TABLE `settimanale`
  ADD PRIMARY KEY (`DayId`),
  ADD KEY `Email` (`Email`(768)) USING BTREE;

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Email` (`Email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `settimanale`
--
ALTER TABLE `settimanale`
  MODIFY `DayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
