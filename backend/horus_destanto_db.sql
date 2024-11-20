-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 05:06 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `horus_destanto_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_claim`
--

CREATE TABLE `tb_claim` (
  `id` int(255) NOT NULL,
  `id_voucher` int(255) NOT NULL,
  `tanggal_claim` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(65) NOT NULL,
  `email` varchar(25) NOT NULL,
  `nama` varchar(25) NOT NULL,
  `tanggal_daftar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `password`, `email`, `nama`, `tanggal_daftar`) VALUES
(11, 'desta', '$2b$10$c38.31BkpN8ZBplxhe1Ku.Jle4XEALVUsEvTI1V7C4outwZkDuHRC', 'desta@gmail.com', 'destanto', '2024-11-19');

-- --------------------------------------------------------

--
-- Table structure for table `tb_voucher`
--

CREATE TABLE `tb_voucher` (
  `id` int(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_voucher`
--

INSERT INTO `tb_voucher` (`id`, `nama`, `foto`, `kategori`, `status`) VALUES
(1, 'gratis ongkir 1', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'ongkir', 0),
(2, 'pengembalian 1', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'pengembalian', 0),
(3, 'cash back 1', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'cashback', 0),
(4, 'gratis ongkir 2', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'ongkir', 0),
(5, 'pengembalian 2', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'pengembalian', 0),
(6, 'cash back 2', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'cashback', 0),
(7, 'gratis ongkir 3', 'https://pbs.twimg.com/profile_images/1659444705275568128/ENwcnZgS_400x400.jpg', 'ongkir', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_claim`
--
ALTER TABLE `tb_claim`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_voucher`
--
ALTER TABLE `tb_voucher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_claim`
--
ALTER TABLE `tb_claim`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
