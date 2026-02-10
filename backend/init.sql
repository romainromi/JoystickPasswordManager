-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 10, 2026 at 11:37 AM
-- Server version: 8.0.44-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `JoystickPasswordManager`
--

CREATE DATABASE IF NOT EXIST JoystickPasswordManager;

USE JoystickPasswordManager;

-- --------------------------------------------------------

--
-- Table structure for table `mots_de_passes`
--

CREATE TABLE `mots_de_passes` (
  `id` bigint UNSIGNED NOT NULL,
  `url` varchar(255) NOT NULL,
  `identifiant` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `utilisateur_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `verify_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `reset_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `email`, `password`, `role`, `added`, `is_verified`, `verify_token`, `reset_token`) VALUES
(1, 'cocix97223@desiys.com', '$argon2id$v=19$m=65536,t=3,p=4$1Vg0O+Jfo0cM3DvjDiOOEA$4KJ/VmjQfK72OUW/MRB2UgeszNAThBl5UPBReIO/rCI', 'USER', '2026-02-10 08:58:42', 1, NULL, NULL),
(2, 'cocix972@desiys.com', '$argon2id$v=19$m=65536,t=3,p=4$PSHAh7wiyAVcJ9RTDBC78Q$cO+FstEdHEhXwoK3vAsY7ArM7oXaxsOpwogTCytJ4BE', 'USER', '2026-02-10 09:07:46', 0, '87b77ba7-ffb3-42e5-a1bf-049b3ada2fbf', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mots_de_passes`
--
ALTER TABLE `mots_de_passes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mots_de_passes_utilisateur_id_foreign` (`utilisateur_id`);

--
-- Indexes for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilisateurs_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mots_de_passes`
--
ALTER TABLE `mots_de_passes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mots_de_passes`
--
ALTER TABLE `mots_de_passes`
  ADD CONSTRAINT `mots_de_passes_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;