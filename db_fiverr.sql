/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `binh_luan_ibfk_1` (`ma_cong_viec`),
  KEY `binh_luan_ibfk_2` (`ma_nguoi_binh_luan`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `cong_viec` (`id`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `chi_tiet_loai_cong_viec`;
CREATE TABLE `chi_tiet_loai_cong_viec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_chi_tiet` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_loai_cong_viec` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chi_tiet_loai_cong_viec_ibfk_1` (`ma_loai_cong_viec`),
  CONSTRAINT `chi_tiet_loai_cong_viec_ibfk_1` FOREIGN KEY (`ma_loai_cong_viec`) REFERENCES `loai_cong_viec` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cong_viec`;
CREATE TABLE `cong_viec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(255) DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `mo_ta_ngan` varchar(255) DEFAULT NULL,
  `sao_cong_viec` int DEFAULT NULL,
  `ma_chi_tiet_loai` int DEFAULT NULL,
  `nguoi_tao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cong_viec_ibfk_1` (`ma_chi_tiet_loai`),
  KEY `cong_viec_ibfk_2` (`nguoi_tao`),
  CONSTRAINT `cong_viec_ibfk_1` FOREIGN KEY (`ma_chi_tiet_loai`) REFERENCES `chi_tiet_loai_cong_viec` (`id`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `cong_viec_ibfk_2` FOREIGN KEY (`nguoi_tao`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `loai_cong_viec`;
CREATE TABLE `loai_cong_viec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_loai_cong_viec` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  `avatar` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `thue_cong_viec`;
CREATE TABLE `thue_cong_viec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_thue` int DEFAULT NULL,
  `ngay_thue` datetime DEFAULT NULL,
  `hoan_thanh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `thue_cong_viec_ibfk_1` (`ma_cong_viec`),
  KEY `thue_cong_viec_ibfk_2` (`ma_nguoi_thue`),
  CONSTRAINT `thue_cong_viec_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `cong_viec` (`id`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `thue_cong_viec_ibfk_2` FOREIGN KEY (`ma_nguoi_thue`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(4, 2, 3, '2022-11-11 00:00:00', 'Comment 2', 2);
INSERT INTO `binh_luan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(5, 2, 3, '2022-11-11 00:00:00', 'Comment 2', 2);


INSERT INTO `chi_tiet_loai_cong_viec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(1, 'Test thêm 3', '1673663656136-managertime1-1550824523_750x0.jpg', 1);
INSERT INTO `chi_tiet_loai_cong_viec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(2, 'Test thêm 4', '', 1);
INSERT INTO `chi_tiet_loai_cong_viec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(3, 'Test thêm', '1674146616795-hieu-qua-cong-viec.jpg', NULL);
INSERT INTO `chi_tiet_loai_cong_viec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(4, 'Test thêm 2', '1674146271411-hieu-qua-cong-viec.jpg', 1);

INSERT INTO `cong_viec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(2, 'Sửa công việc', 12, 122, '1673692295778-hieu-qua-cong-viec.jpg', 'Mô tả', 'Mô tả ngắn', 4, 1, 1);
INSERT INTO `cong_viec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(6, 'Thêm công việc 2', 12, 122, NULL, 'Mô tả', 'Mô tả ngắn', 4, 1, 1);
INSERT INTO `cong_viec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(7, 'Hế lô', 12, 122, NULL, 'Mô tả', 'Mô tả ngắn', 4, 1, 1);
INSERT INTO `cong_viec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(8, 'Thêm công việc 11111', 12, 122, '1674146722117-hieu-qua-cong-viec.jpg', 'Mô tả', 'Mô tả ngắn', 4, 1, 1);

INSERT INTO `loai_cong_viec` (`id`, `ten_loai_cong_viec`) VALUES
(1, 'BE');
INSERT INTO `loai_cong_viec` (`id`, `ten_loai_cong_viec`) VALUES
(2, 'FE');
INSERT INTO `loai_cong_viec` (`id`, `ten_loai_cong_viec`) VALUES
(3, 'FS');

INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin123', '0123456789', '2002-06-07', 'NAM', 'ADMIN', '', '', '');
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(2, 'Test Put2', 'nhat1@gmail.com', 'user123', '0987654321', '1999-05-20', 'NU', 'USER', '[\'ĐH\']', '[\'ĐH\', \'CD\']', '1674146921363-hieu-qua-cong-viec.jpg');
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(3, 'Nhật', 'nhat@gmail.com', 'user123', '0987654321', '1999-05-20', 'NU', 'USER', '[\'ĐH\', \'CD\']', NULL, NULL);
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(4, 'user', 'user@gmail.com', 'user123', '0123456789', '2002-06-07', 'NU', 'USER', '', '', ''),
(5, 'Nhật', 'nhat12@gmail.com', 'user123', '0987654321', '1999-05-20', 'NU', 'USER', '[\'ĐH\', \'CD\']', '[\'ĐH\', \'CD\']', NULL),
(6, 'Test Put2', 'nhat1@gmail.com', 'user123', '0987654321', '1999-05-20', 'NU', 'USER', '[\'ĐH\']', '[\'ĐH\', \'CD\']', NULL);

INSERT INTO `thue_cong_viec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(3, 2, 1, '2023-01-30 00:00:00', 1);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;