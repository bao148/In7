-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 14, 2025 lúc 12:15 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `in7`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `category_name`, `images`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Ghế', 'ghe2.jpg', 'active', 'Ghế được thiết kế với sự cân bằng hoàn hảo giữa tính thẩm mỹ và sự thoải mái. Chiếc ghế không chỉ mang lại vẻ đẹp hiện đại mà còn đảm bảo sự bền bỉ và tiện dụng trong suốt quá trình sử dụng.', '2024-10-21 11:15:16', '2024-12-20 20:10:05'),
(2, 'Bàn ', 'bancaocap.jpg', 'active', 'Những chiếc bàn của In7 là sự kết hợp hoàn hảo giữa thiết kế hiện đại và tính năng tiện dụng, mang lại trải nghiệm tuyệt vời cho không gian của bạn. Được chế tác từ những chất liệu tốt nhất, sản phẩm không chỉ bền bỉ theo thời gian mà còn thể hiện gu thẩm mỹ tinh tế.', '2024-10-21 11:15:16', '2024-12-20 20:10:37'),
(3, 'Kệ', 'tugiay1.jpg', 'active', 'Kệ không chỉ là giải pháp lưu trữ mà còn là điểm nhấn tinh tế giúp tổ chức không gian một cách khoa học và đẹp mắt. Với nhiều kiểu dáng, chất liệu và kích thước đa dạng, các sản phẩm kệ của chúng tôi sẽ đáp ứng mọi nhu cầu của bạn, từ sắp xếp gọn gàng đến trang trí sáng tạo.', '2024-10-21 11:15:16', '2024-12-20 20:11:13'),
(4, 'Đồ Trang Trí', 'special-4.jpg', 'active', 'Không gian sống không chỉ là nơi để ở, mà còn là nơi để bạn thể hiện cá tính và phong cách riêng. Với bộ sưu tập đồ trang trí đa dạng, chúng tôi mang đến cho bạn những sản phẩm độc đáo, tinh tế, giúp bạn biến ngôi nhà, văn phòng hay cửa hàng của mình trở nên ấn tượng và đầy cảm hứng.', '2024-10-21 11:15:16', '2024-12-20 20:11:41'),
(5, 'Tủ ', 'kesach.jpg', 'active', 'Tủ có thiết kế hiện đại, gọn nhẹ nhưng lại chắc chắn giúp người dùng thuận tiện cất giữ, bảo quản các quần áo và các vật dụng gia đình khác.', '2024-12-20 20:12:25', '2024-12-20 20:19:34'),
(6, 'Gường', 'guong2.jpg', 'active', 'Giường hiện đại thường tích hợp khá nhiều tính năng trong cùng một sản phẩm. Các mẫu giường này thường được lựa chọn sử dụng ở nhiều không gian bởi vẻ ngoài vô cùng thanh lịch, sang trọng. Ngoài ra, c', '2024-12-20 20:13:30', '2024-12-20 20:19:42'),
(7, 'Sofa', 'sofa1.jpg', 'active', 'Sofa không chỉ là món đồ nội thất, mà còn là tâm điểm của không gian sống, nơi bạn thư giãn, trò chuyện và tận hưởng những khoảnh khắc đáng nhớ bên gia đình và bạn bè.', '2024-12-20 20:17:23', '2024-12-20 20:20:18'),
(8, 'Đèn', 'den1.jpg', 'active', 'Ánh sáng không chỉ là yếu tố chức năng mà còn là một phần không thể thiếu để tạo nên bầu không khí hoàn hảo cho không gian sống.', '2024-12-20 20:19:07', '2024-12-20 20:20:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `key_token`
--

CREATE TABLE `key_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `public_key` text NOT NULL,
  `private_key` text NOT NULL,
  `refresh_tokens_used` text DEFAULT NULL,
  `refresh_token` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `key_token`
--

INSERT INTO `key_token` (`id`, `user_id`, `public_key`, `private_key`, `refresh_tokens_used`, `refresh_token`, `created_at`, `updated_at`) VALUES
(16, 26, '87c4c624285146618bb84a71a0d026fa6e2cc67da0edb95ba7eba5a1c1a7dc9402a70e4f76785e330e156b0e70fc05878dd0aa600a12ca5b26487bd455ce990f', '055a10732e91a80731ae25bc29cc99f5f510f41e7bbc880af049aa5a7b0aa60708ab51284d2d4f7862d85229db66543d0cf7160822b015dae72e84dc9e84fa80', '[]', '', '2024-11-23 12:27:39', '2024-11-23 12:27:39'),
(32, 27, '1e7de95669051048f7a56d6052d9dd9cd1bfa3330406758334fdcc571306f4cd789118fe65980e701409b2d3e8ad53df3edf799f810262a971f5ebbd54b5815e', '40ba39dd2d261123bbf8328760d3618635d5c43f49e2bb2235cd937a9309d476ababb6e3aa6622f514ee5ad7935c4fae1d14691e89158fcb72bad9d7338787c4', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJlbWFpbCI6IjFAMSIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzMxMTE5MzcsImV4cCI6MTczMzcxNjczN30.EozFxsV1o6de82H7QqpdCn4vQFcHF-1oTJp-DMlkSSo', '2024-11-28 05:54:33', '2024-12-02 03:58:57'),
(33, 24, 'cfebe23ed2e835f7d07de3ca86026267d99da0ab452be92dd275e3a691d59cfd7c9d9b6433699ec0a5d98fd75b6893ca821e42de8aa0828ff51d90ccccacfe6f', '5185afdbd1bfc357e9f8f1c538e1a1793151062246f4218188ae03409db8ccc627ff0435361f7eace22629bb40a494f8d30280504e9f0f1a3aeea301674c7d2a', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJlbWFpbCI6ImxhbW5oYXQ1MDlAZ21haWwuY29tIiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjk0MTc1MSwiZXhwIjoxNzMzNTQ2NTUxfQ.uggsj2f3utUfNODhI07f0zWJJy6jsRdaw7iowMQqVE0', '2024-11-30 04:42:31', '2024-11-30 04:42:31'),
(35, 30, '8d4dcaf39bc76a86515ca288a3865cde0eaa16402fa0025b10eee18523b906883792e2442a62457afa96c0e87a019f74f451bb3d5ed302a5dd8666b17534025b', '0a18ef3f2acb9e097f515c6d190b7b5197bc6792c29da41d1982b24e6dea1446a2a9dc1014733862bb1088a04ac45a8f8c07d849d7e4269644e074ded4b1da25', '[]', '', '2024-12-14 05:41:43', '2024-12-14 05:41:43'),
(47, 35, '4012c0c221f000f923cdeb35f549d580f4384b08d93589529a75dffed8c4e3d3dac92d5c12220eef657d6c536d7217b903b36e6ad76a4065a74765ef1e1927db', 'bd9090e8ff899c80dd8ee0f1dba4294db266bef1319cbb3ab34d9676735cb38d9cfc385fbf80ab28b1de6251eb13d2192e54b9d0b036ad1cc20907c310122b47', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM1LCJlbWFpbCI6ImxpbmhjcXBjMTExMTFAZnB0LmVkdS5jb20iLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE3MzQ2ODQ5NjcsImV4cCI6MTczNTI4OTc2N30.DJ5YEbx5G5uuFzCt8S1SuIlIiU6L9B5YUER3-Cymo3Q', '2024-12-16 00:45:59', '2024-12-20 08:56:07'),
(49, 37, '765cd184f326f4be20d000421bf0642554470c995af5eb8bb25c44eb2fad1264d30a2da86aefdabfff6689d101cbfa10062b6f2c130bc34e4eb74d9e50c5ae31', '7ba90f5c25e2e03bbb7e4bb9a15b7be0666e20bb8606b43d2d458d56b4d7556b69d09e373381acd3a943d3b6d05c53743316bd17f7c8f3484bb8fd2d0a28d8b0', '[]', '', '2024-12-16 03:23:39', '2024-12-16 03:23:39'),
(50, 38, '07c7afd6c5a9582a4eed49300579a7fb55f34a3225daab530f2b61e3466bc365ff8f40c62ee5fb3c7df9d2002ed763beeede7ac7405bfa64bc52e0a3493e5365', 'bb7fce5711689cf255f8c0585573d8958593a1481df4d7161a3732bfff417c3076ac002f8cfcbbc714650fb6fff53db2e4c34d0af51dc3f8982c1ada5f3a9e60', '[]', '', '2024-12-16 03:55:37', '2024-12-16 03:55:37'),
(58, 40, '3888be91ec96f9ff54fcedb1d1e65a65f01ca2a9a092eef70e568e8f0ba32d48671acb440ec33f056c02771d042716c9b5465d700f6ba82ab7af6524bc9194d1', '1522a21cf044c3759791b9cf5c182e1e8c62d8ccbe1ed539721eff02b15adab9251bdb9c8e9029dfc729f28a64ad65fb14e3a4f17f2ef6357dae42b6aed42df4', '[]', '', '2024-12-20 15:29:53', '2024-12-20 15:29:53'),
(60, 41, 'caf8dce1944a915f1a299550ee13f5fd30f5f2f76800c6e6b6533f8981ea5d2c94a645779d5fdbaa3f7989c5a0d94d061dc49a4dee2ad1b30046c102301f7134', 'f64f8e665f0406efd0783decdd46bb62b6d1bd900dd0cf2dba3922c88e06ab56cf096109d5e4312d4b99a4098a690ff32fc9f486b67e34e005204723ffa56a02', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJlbWFpbCI6ImxpbmgxMkBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE3MzQ3MTMyNjEsImV4cCI6MTczNTMxODA2MX0.xUA0WOHtBQQMJCE-KLu1ebX3vr4KipgPR_ntlnvr1RQ', '2024-12-20 16:47:41', '2024-12-20 16:47:41'),
(61, 28, '021db51e3579c74dedff79793653e67efdbe44b0e4324a56adc3baf0c33c86098587b7f7dc7edc0227928ac7766fe15c093ec6546b4cee358fe261ba11f53b79', '218fe700868f49ccca66c58e1e511cb1dc8eac354681f28f0bf68d320cfc2128b5361d4d2a767d3ebf80ce6659a7f0fba7c7dbb871022e34def31f5eebc8010d', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im5odTExMjM0QGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzQ3NTEwMTksImV4cCI6MTczNTM1NTgxOX0.e3smrj9Td4-4qk5f9EsDATHD7h6bC_vG96Ms6_sLBec', '2024-12-21 03:16:59', '2024-12-21 03:16:59'),
(63, 34, '17f3b8e5a5694da84900cfad486c93e6f4218d3a416a3633da1f6771e3e9b4252aa8930bc94516eb5b1e006db2b3efeedb8b6a02253aa100d0857aba1c961cca', '4a2b1acd1aaa4b3d5dda2766e12d829d3c8d8d34ad1fc14817c3ffa145b0364437cd73b56abec85a7d085377b06a7f5764bc0330b67b472fa62471e7ec8ff2c4', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM0LCJlbWFpbCI6ImRpZW4wOTIyNjY3NTc0QGdtYWlsLmNvbSIsImlhdCI6MTczNDc1NjQ4MiwiZXhwIjoxNzM1MzYxMjgyfQ.1OSBdBBtYIrb6bdQwSbuEw2D_vyTijrQi5VIqgc73bk', '2024-12-21 04:48:02', '2024-12-21 04:48:02'),
(65, 44, '9df9f3b969417c97ef1b882e764d5355acce4cb1f65aa727ec0dfac62b1e692ba542bae71ea398966f1651b9d2770c0125c3f7c78d0c020f9ff62f209926c6a7', '16e45ef47347a6d7a1e3fd86d52b18064d3ffa5abb455aa3549c357d17f2d4e246880e42c7e7764266b477f340a9df1f0a196b18da7a3c4ee3637ba8837f5cb8', '[]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ0LCJlbWFpbCI6ImJhb0BnbWFpbC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzU1MTU1OTIwLCJleHAiOjE3NTU3NjA3MjB9.rkQBDjq9mhgv8hj4R4TI0xB4TVEfQVmMgTagRjMbOhY', '2025-07-26 05:47:31', '2025-08-14 07:18:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(14, 24, 'order', 'Người dùng ID 34 đã đặt đơn hàng mới với ID ORD-1734164859960', 0, '2024-12-14 15:27:41', '2024-12-14 15:27:41'),
(15, 24, 'order', 'Người dùng ID 34 đã đặt đơn hàng mới với ID ORD-1734164998192', 0, '2024-12-14 15:29:59', '2024-12-14 15:29:59'),
(16, 24, 'order', 'Người dùng ID 34 đã đặt đơn hàng mới với ID ORD-1734165486015', 0, '2024-12-14 15:38:07', '2024-12-14 15:38:07'),
(17, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734264395927', 0, '2024-12-15 19:06:37', '2024-12-15 19:06:37'),
(18, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734264675294', 0, '2024-12-15 19:11:16', '2024-12-15 19:11:16'),
(19, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734264938136', 0, '2024-12-15 19:15:38', '2024-12-15 19:15:38'),
(20, 24, 'order', 'Người dùng ID 35 đã đặt đơn hàng mới với ID ORD-1734310075874', 0, '2024-12-16 07:47:57', '2024-12-16 07:47:57'),
(21, 24, 'order', 'Người dùng ID 35 đã đặt đơn hàng mới với ID ORD-1734310106992', 0, '2024-12-16 07:48:27', '2024-12-16 07:48:27'),
(22, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"quá đẹp \"', 0, '2024-12-16 07:53:48', '2024-12-16 07:53:48'),
(23, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"hàng không giống hình \"', 0, '2024-12-16 07:54:07', '2024-12-16 07:54:07'),
(24, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"cũng tạm ổn\"', 0, '2024-12-16 08:00:12', '2024-12-16 08:00:12'),
(25, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"okok\"', 0, '2024-12-16 08:01:21', '2024-12-16 08:01:21'),
(26, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"bjh\"', 0, '2024-12-16 09:04:53', '2024-12-16 09:04:53'),
(27, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"êgregr\"', 0, '2024-12-16 09:28:13', '2024-12-16 09:28:13'),
(28, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 2: \"ok\"', 0, '2024-12-16 09:53:57', '2024-12-16 09:53:57'),
(29, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 30: \"3\"', 0, '2024-12-16 09:54:28', '2024-12-16 09:54:28'),
(30, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 30: \"1\"', 0, '2024-12-16 09:57:35', '2024-12-16 09:57:35'),
(31, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 30: \"1\"', 0, '2024-12-16 09:58:54', '2024-12-16 09:58:54'),
(32, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"ok\"', 0, '2024-12-16 10:03:26', '2024-12-16 10:03:26'),
(33, 24, 'order', 'Người dùng ID 35 đã đặt đơn hàng mới với ID ORD-1734318324782', 0, '2024-12-16 10:05:25', '2024-12-16 10:05:25'),
(34, 24, 'order', 'Người dùng ID 38 đã đặt đơn hàng mới với ID ORD-1734321418097', 0, '2024-12-16 10:56:59', '2024-12-16 10:56:59'),
(35, 24, 'comment', 'Người dùng ID 38 đã bình luận trên sản phẩm ID 1: \"đẹp\"', 0, '2024-12-16 10:59:22', '2024-12-16 10:59:22'),
(36, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"ok\"', 0, '2024-12-16 11:00:50', '2024-12-16 11:00:50'),
(37, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734323013993', 0, '2024-12-16 11:23:34', '2024-12-16 11:23:34'),
(38, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734510203490', 0, '2024-12-18 15:23:26', '2024-12-18 15:23:26'),
(39, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734511379127', 0, '2024-12-18 15:43:00', '2024-12-18 15:43:00'),
(40, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734591734557', 1, '2024-12-19 14:02:15', '2024-12-19 14:28:29'),
(41, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 2: \"ok\"', 0, '2024-12-19 14:43:12', '2024-12-19 14:43:12'),
(42, 24, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734596245036', 0, '2024-12-19 15:17:26', '2024-12-19 15:17:26'),
(43, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 2: \"ok nha\"', 0, '2024-12-19 15:20:39', '2024-12-19 15:20:39'),
(44, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734680930119', 1, '2024-12-20 14:48:51', '2024-12-20 14:49:37'),
(45, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734689504096', 0, '2024-12-20 17:11:45', '2024-12-20 17:11:45'),
(46, 28, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"scsc\"', 0, '2024-12-20 17:12:41', '2024-12-20 17:12:41'),
(47, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734689885232', 0, '2024-12-20 17:18:06', '2024-12-20 17:18:06'),
(48, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 3: \"ok\"', 0, '2024-12-20 17:18:32', '2024-12-20 17:18:32'),
(49, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734689968779', 0, '2024-12-20 17:19:29', '2024-12-20 17:19:29'),
(50, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734690076291', 0, '2024-12-20 17:21:17', '2024-12-20 17:21:17'),
(51, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 5: \"đẹp\"', 0, '2024-12-20 17:22:28', '2024-12-20 17:22:28'),
(52, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 5: \"Không có mô tả\"', 0, '2024-12-20 17:23:15', '2024-12-20 17:23:15'),
(53, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734752534820', 0, '2024-12-21 10:42:15', '2024-12-21 10:42:15'),
(54, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734752546181', 0, '2024-12-21 10:42:27', '2024-12-21 10:42:27'),
(55, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734752560832', 0, '2024-12-21 10:42:42', '2024-12-21 10:42:42'),
(56, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 3: \"Sản phẩm chất lượng quá đẹp\"', 0, '2024-12-21 10:45:41', '2024-12-21 10:45:41'),
(57, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734752759225', 0, '2024-12-21 10:45:59', '2024-12-21 10:45:59'),
(58, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734752767725', 0, '2024-12-21 10:46:09', '2024-12-21 10:46:09'),
(59, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734752814614', 0, '2024-12-21 10:46:55', '2024-12-21 10:46:55'),
(60, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 27: \"GIao Hàng Bị Lỗi\"', 0, '2024-12-21 10:47:37', '2024-12-21 10:47:37'),
(61, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 29: \"Chất lượng kém\"', 0, '2024-12-21 10:47:58', '2024-12-21 10:47:58'),
(62, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 4: \"Đẹp\"', 0, '2024-12-21 10:49:02', '2024-12-21 10:49:02'),
(63, 28, 'order', 'Người dùng ID 35 đã đặt đơn hàng mới với ID ORD-1734755605920', 0, '2024-12-21 11:33:27', '2024-12-21 11:33:27'),
(64, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734755924356', 0, '2024-12-21 11:38:45', '2024-12-21 11:38:45'),
(65, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734756011157', 0, '2024-12-21 11:40:11', '2024-12-21 11:40:11'),
(66, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"đẹp\"', 0, '2024-12-21 11:40:43', '2024-12-21 11:40:43'),
(67, 28, 'order', 'Người dùng ID 28 đã đặt đơn hàng mới với ID ORD-1734756066726', 0, '2024-12-21 11:41:07', '2024-12-21 11:41:07'),
(68, 24, 'comment', 'Người dùng ID 28 đã bình luận trên sản phẩm ID 1: \"cccc\"', 0, '2024-12-21 11:43:54', '2024-12-21 11:43:54'),
(69, 28, 'order', 'Người dùng ID 44 đã đặt đơn hàng mới với ID ORD-1753509260451', 0, '2025-07-26 12:54:22', '2025-07-26 12:54:22'),
(70, 28, 'order', 'Người dùng ID 44 đã đặt đơn hàng mới với ID ORD-1753509766411', 0, '2025-07-26 13:02:47', '2025-07-26 13:02:47'),
(71, 28, 'order', 'Người dùng ID 44 đã đặt đơn hàng mới với ID ORD-1753509966203', 0, '2025-07-26 13:06:07', '2025-07-26 13:06:07'),
(72, 28, 'order', 'Người dùng ID 44 đã đặt đơn hàng mới với ID ORD-1753510508477', 0, '2025-07-26 13:15:09', '2025-07-26 13:15:09'),
(73, 28, 'order', 'Người dùng ID 44 đã đặt đơn hàng mới với ID ORD-1753510549964', 0, '2025-07-26 13:15:51', '2025-07-26 13:15:51'),
(74, 28, 'order', 'Người dùng ID 44 đã đặt đơn hàng mới với ID ORD-1755149422947', 0, '2025-08-14 12:30:24', '2025-08-14 12:30:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` enum('processing','canceled','delivering','completed') NOT NULL DEFAULT 'processing',
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `voucher_code` varchar(255) DEFAULT NULL,
  `voucher_discount` decimal(10,0) DEFAULT NULL,
  `voucher_id` int(11) DEFAULT NULL,
  `transIdMomo` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `voucher_code` varchar(255) DEFAULT NULL,
  `voucher_discount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `postcategory`
--

CREATE TABLE `postcategory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `postcategory`
--

INSERT INTO `postcategory` (`id`, `name`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'Sản Phẩm Thủ Côngg', '2024-10-21 11:18:48', '2024-12-20 14:35:42', 'new.jpg'),
(2, 'Lời Khuyên Trang Trí Nội Thất', '2024-10-21 11:18:48', '2024-11-24 20:07:16', 'new.jpg'),
(3, 'Cách Sắp Xếp Nội Thất Thông Minh', '2024-10-21 11:18:48', '2024-11-24 20:07:23', 'new.jpg'),
(4, 'Nội Thất Cho Không Gian Nhỏ', '2024-10-21 11:18:48', '2024-11-24 20:07:28', 'new.jpg'),
(6, 'Phối Màu Nội Thất Hoàn Hảo', '2024-11-01 13:48:45', '2024-11-24 20:07:34', 'new.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `post_category_id` int(11) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `post_category_id`, `status`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'Xu Hướng Trang Trí Nội Thất Mới Nhất Năm 2024', 'Bài viết này sẽ dẫn bạn qua những xu hướng nổi bật trong trang trí nội thất năm nay, từ thiết kế tối giản, sử dụng vật liệu tự nhiên, đến các tông màu nổi bật như xanh rêu, cam đất, hay vàng mù tạt. Độc giả sẽ khám phá cách các phong cách như Scandinavian, Industrial hay phong cách Japandi kết hợp giữa Nhật Bản và Bắc Âu đang dần chiếm lĩnh thị trường nội thất. Kèm theo đó là các gợi ý cụ thể để ứng dụng các xu hướng này vào không gian sống mà không mất nhiều chi phí.', 1, 'published', '2024-11-20 13:14:17', '2024-12-20 21:53:20', 'blog-post-1.jpg'),
(2, 'Bí Quyết Biến Không Gian Nhỏ Thành Tổ Ấm Lý Tưởng', 'Với không gian sống ngày càng thu nhỏ, việc tối ưu hóa diện tích trở thành một trong những thách thức lớn nhất. Bài viết này hướng dẫn cách tận dụng ánh sáng tự nhiên, chọn nội thất thông minh và sắp xếp bố cục hợp lý để không gian nhỏ trở nên thoải mái hơn. Độc giả sẽ học cách sử dụng tủ âm tường, ghế gấp hoặc bàn kéo dài để tiết kiệm diện tích mà vẫn đảm bảo tiện nghi và thẩm mỹ.', 2, 'published', '2024-10-25 13:15:17', '2024-12-20 21:55:41', 'blog-post-2.jpg'),
(3, 'Top 10 Món Đồ Trang Trí Nội Thất Được Ưa Chuộng Nhất', 'Khám phá danh sách những sản phẩm nội thất \"hot\" nhất, từ đèn chùm độc đáo, thảm trải sàn họa tiết, đến gương trang trí hiện đại. Bài viết cung cấp đánh giá chi tiết về từng món đồ, tại sao chúng trở nên phổ biến và cách lựa chọn chúng phù hợp với phong cách của từng căn phòng. Ngoài ra, bài viết còn đưa ra các mẹo phối hợp các món đồ này để tạo điểm nhấn ấn tượng.', 3, 'draft', '2024-10-25 13:16:17', '2024-12-03 13:05:46', 'blog-post-3.jpg'),
(4, 'Cách Lựa Chọn Đồ Nội Thất Hài Hòa Với Màu Sắc Không Gian', 'Màu sắc đóng vai trò quan trọng trong việc tạo nên cảm giác và phong cách cho ngôi nhà. Bài viết này tập trung vào cách phối màu sao cho hài hòa giữa đồ nội thất và tổng thể không gian. Từ việc chọn gam màu trung tính cho cảm giác thanh lịch, đến phối hợp các tông màu nổi bật như vàng hoặc xanh để tạo ấn tượng mạnh mẽ. Độc giả sẽ nhận được các công thức phối màu cụ thể để áp dụng vào phòng khách, phòng ngủ, hoặc bếp.\r\n', 4, 'draft', '2024-10-25 13:17:17', '2024-12-03 13:05:50', 'blog-post-4.jpg'),
(5, 'Đèn Trang Trí: Điểm Nhấn Tinh Tế Cho Mỗi Căn Phòng', 'Ánh sáng không chỉ phục vụ nhu cầu chiếu sáng mà còn là yếu tố trang trí quan trọng. Bài viết này giới thiệu các loại đèn trang trí như đèn thả trần, đèn đứng hoặc đèn bàn và cách chúng có thể làm nổi bật phong cách nội thất. Ngoài ra, bài viết cũng chia sẻ mẹo chọn đèn phù hợp với từng không gian như phòng khách, phòng ngủ hoặc góc làm việc.\r\n\r\n', 1, 'published', '2024-10-25 13:18:17', '2024-12-03 11:39:29', 'blog-single-1.jpg'),
(6, 'Tầm Quan Trọng Của Trang Trí Nội Thất Trong Việc Nâng Cao Chất Lượng Sống', 'Trang trí nội thất không chỉ mang tính thẩm mỹ mà còn ảnh hưởng sâu sắc đến cảm xúc và sức khỏe của con người. Bài viết này phân tích cách một không gian đẹp, hài hòa có thể cải thiện tâm trạng, giảm căng thẳng và tăng sự sáng tạo. Đồng thời, bài viết cung cấp các lời khuyên thực tiễn để tạo một không gian sống cân bằng, từ việc chọn màu sắc, ánh sáng đến bài trí nội thất.', 2, 'published', '2024-10-25 13:19:17', '2024-12-03 11:39:59', 'blog-post-1.jpg'),
(7, 'Gợi Ý Thiết Kế Phòng Khách Hiện Đại Với Đồ Nội Thất Đa Năng', 'Phòng khách là nơi thể hiện rõ nhất phong cách của gia chủ. Bài viết này tập trung vào các món đồ nội thất đa năng như sofa giường, bàn trà có ngăn kéo, hoặc kệ sách tích hợp tivi. Độc giả sẽ được hướng dẫn cách bố trí những món đồ này sao cho vừa tiết kiệm không gian vừa tăng tính tiện ích và thẩm mỹ cho phòng khách.\r\n\r\n', 3, 'published', '2024-10-25 13:20:17', '2024-12-03 11:40:44', 'blog-post-2.jpg'),
(8, 'Làm Mới Không Gian Sống Với Phụ Kiện Trang Trí Độc Đáo', 'Các phụ kiện nhỏ như tranh treo tường, gối tựa lưng, hoặc chậu cây cảnh có thể thay đổi hoàn toàn diện mạo không gian sống. Bài viết này hướng dẫn cách chọn phụ kiện phù hợp với từng phong cách nội thất và các mẹo phối hợp để làm nổi bật không gian. Đồng thời, độc giả sẽ tìm thấy các xu hướng phụ kiện trang trí mới nhất hiện nay.\r\n\r\n', 4, 'published', '2024-10-25 13:21:17', '2024-12-03 11:41:39', 'blog-post-3.jpg'),
(9, ' Hướng Dẫn Chọn Nội Thất Thân Thiện Với Môi Trường', 'Sử dụng nội thất thân thiện với môi trường không chỉ giúp bảo vệ hành tinh mà còn mang lại vẻ đẹp tự nhiên và an toàn cho không gian sống. Bài viết này giới thiệu các vật liệu bền vững như gỗ tái chế, tre, hoặc mây và cách chọn đồ nội thất từ các thương hiệu cam kết bảo vệ môi trường. Đồng thời, bài viết cũng chia sẻ lợi ích sức khỏe từ việc sử dụng các sản phẩm nội thất không chứa hóa chất độc hại.', 1, 'published', '2024-10-25 13:22:17', '2024-12-03 11:41:50', 'blog-post-4.jpg'),
(10, 'Kinh Nghiệm Mua Sắm Nội Thất Trực Tuyến An Toàn Và Tiết Kiệm', 'Mua sắm nội thất trực tuyến mang lại sự tiện lợi nhưng cũng tiềm ẩn nhiều rủi ro. Bài viết này cung cấp các bí quyết để chọn được sản phẩm chất lượng, từ việc kiểm tra thông tin sản phẩm, đánh giá cửa hàng, đến cách so sánh giá cả. Ngoài ra, độc giả sẽ tìm thấy các mẹo săn ưu đãi và tận dụng chương trình giảm giá để tiết kiệm chi phí.', 2, 'published', '2024-10-25 13:23:17', '2024-12-03 11:42:08', 'blog-post-5.jpg'),
(12, 'Kích Thước Bàn Ăn Thông Minh Quyết Định Không Gian Sống Hoàn Hảo', 'Một chiếc bàn ăn phù hợp không chỉ giúp tiết kiệm diện tích mà còn mang lại sự tiện lợi và thoải mái cho gia đình. Do đó, việc chọn đúng kích thước bàn ăn thông minh sẽ khiến không gian trở nên hài hòa, tiện dụng, mang lại may mắn và tài lộc. Tuy nhiên, việc chọn lựa các mẫu bàn ăn có kích thước phù hợp không phải là điều dễ dàng. Hãy cùng “bỏ túi” ngay những thông tin cần thiết dưới đây để giải quyết vấn đề đó!', 3, 'published', '2024-12-20 21:41:34', '2024-12-20 21:43:13', 'banan.jpg'),
(13, 'Các Mẫu Ghế Sofa Băng Đẹp, Hiện Đại Đáng Mua Nhất Hiện Nay', 'Bạn đang tìm kiếm mẫu sofa băng đẹp, hiện đại để làm mới không gian phòng khách? Đừng bỏ lỡ TOP 10 mẫu sofa băng hot nhất năm 2024, với thiết kế tinh tế, chất liệu cao cấp và giá cả phải chăng, chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Khám phá ngay danh sách này và tìm cho mình chiếc sofa lý tưởng!', 2, 'published', '2024-12-20 21:47:30', '2024-12-20 21:47:30', 'noi-that-phong-khach-chung-cu-8.jpg'),
(14, 'Cập nhật với hơn 89 về bố trí phòng khách và bếp đẹp', 'Top hình ảnh về bố trí phòng khách và bếp đẹp do website In7 tổng hợp và biên soạn. Ngoài ra còn có các hình ảnh liên quan đến phòng khách liền bếp 20m2, phòng khách liền bếp 30m2, nhà ống mẫu nhà cấp 4 phòng khách liền, phòng khách liền bếp nhà ống, vách ngăn phòng khách và bếp, phòng khách kết hợp bếp cho nhà nhỏ, phòng khách liền bếp 15m2, phòng khách liền bếp 25m2, phòng khách thông bếp, vách ngăn phòng khách và bếp bằng nhựa, phòng khách liền bếp 40m2, phòng khách liền bếp chung cư, phòng khách liền bếp 40m2, phòng khách liền bếp chung cư, phòng khách đẹp, phòng khách liền, phòng khách và bếp thông nhau, phòng khách liền bếp 20m2, phòng khách kết hợp, nhà bếp và phòng khách chung, vách ngăn phòng khách, phòng bếp đẹp nhà ống, phòng khách bếp liên thông, không gian phòng khách và bếp, Đơn giản, Bật cửa/ Bậu cửa dùng trong nhà, Phong thủy, phòng bếp đẹp sang trọng, cách bố trí phòng bếp đẹp, phòng khách liền phòng ăn, phòng khách liền bếp 20m2, phòng khách liền bếp 30m2, nhà ống mẫu nhà cấp 4 phòng khách liền, phòng khách liền bếp nhà ống, vách ngăn phòng khách và bếp, phòng khách kết hợp bếp cho nhà nhỏ, phòng khách liền bếp 15m2, phòng khách liền bếp 25m2, vách ngăn phòng khách và bếp bằng nhựa, phòng khách thông bếp, vách ngăn phòng khách bằng gỗ, vách ngăn phòng khách và bếp nhà ống, phòng khách liền bếp 40m2, phòng khách liền bếp chung cư, phòng khách đẹp, phòng khách liền, phòng khách và bếp thông nhau, phòng khách liền bếp 20m2.', 3, 'published', '2024-12-20 21:50:45', '2024-12-20 21:50:45', 'Mau-thiet-ke-bep-duoi-gam-cau-thang-6.jpg'),
(15, 'Các mẫu thiết kế nội thất phòng khách liên thông bếp ăn đẹp 2021', 'Thiết kế nội thất phòng khách liên thông phòng bếp vẫn luôn được ưa chuộng từ xưa đến nay trong các thiết kế nội thất nhà ở, bởi nó giúp ánh sáng và không khí lưu thông tốt hơn, tiết kiệm diện tích một cách đáng kể và giúp không gian như được nới rộng hơn. Với diện tích đất xây dựng nhà ngày càng bị thu hẹp như hiện nay thì thiết kế phòng khách liên thông bếp ăn là giải pháp tối ưu dành cho nhiều gia chủ.', 4, 'published', '2024-12-20 21:53:00', '2024-12-20 21:53:00', 'mau-tran-thach-cao-phong-khach-hien-dai-2.jpg'),
(16, 'Thiết kế vách ngăn phòng khách và bếp đẹp ', 'Thiết kế vách ngăn phòng khách và bếp đã trở thành giải pháp tối ưu cho những gia đình sở hữu căn nhà có diện tích nhỏ nhưng mong muốn có khoảng không cho hoạt động sinh hoạt của gia đình. Do vậy, với những ai đang tìm kiếm sự mới mẻ cho không gian căn phòng thì đây là cách tốt nhất mang đến người dùng một không gian căn phòng tươi mới và gọn gàng hơn rất nhiều.', 4, 'published', '2024-12-20 21:55:30', '2024-12-20 21:55:30', 'vach-ngan-phong-khach-2.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount` decimal(5,0) DEFAULT 0,
  `quantity` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `categories_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `discount`, `quantity`, `status`, `categories_id`, `created_at`, `updated_at`, `ProductID`) VALUES
(1, 'Giường Ngủ Gỗ Tràm', 5990000, 'g1.jpg', '– Màu sắc nổi bật, sang trọng đem lại điểm nhấn đặc biệt cho không gian sống.\r\n– Rộng rãi với chiều rộng 1m8, giúp gia đình có thêm không gian ấm cúng quây quần bên nhau sau những ngày dài làm việc.\r\n– Sản phẩm đem lại độ bền cao, an toàn cho sức khoẻ người sử dụng.\r\n– Sản phẩm được Hoàn Mỹ sáng tạo và sản xuất theo dây chuyền chuẩn Châu Âu.', 15, 43, 'active', 6, '2024-10-21 11:16:52', '2025-08-14 15:29:59', NULL),
(2, 'Giường Ngủ Gỗ Tự Nhiên', 7200000, 'g2.webp', '– Đặc biệt phù hợp với các gia đình có trẻ em \r\n– hạn chế va đập, trầy xước, va chạm khi bé nô đùa.\r\n– Giường bọc da luôn mang lại sự sang trọng, nét thẩm mỹ riêng biệt không thể nhầm lẫn.\r\n– Phần tựa lưng cao giúp bạn thoải mái ngả người và thư giãn khi đọc sách, xem phim…\r\n– Tạo điểm nhấn nổi bật cho không gian phòng ngủ.\r\n– Tone màu dễ kết hợp với các sản phẩm Nội thất khác.', 10, 21, 'active', 6, '2024-10-21 11:16:52', '2025-08-14 17:11:05', NULL),
(3, 'Gường Tủ Cao Cấp', 15000000, 'guong2.jpg', '– Giường gỗ chắc chắn, độ bền tuyệt vời.\r\n– Kết cấu chắn chắn, an tâm khi sử dụng.\r\n– Tone màu trắng trẻ trung, thanh lịch, không lỗi mốt.\r\n– Vật liệu gỗ đạt chuẩn Châu Âu, an toàn sức khoẻ cho người dùng.', 10, 97, 'active', 6, '2024-10-21 11:16:52', '2025-07-26 13:15:51', NULL),
(4, 'Bàn Ăn Gỗ Cao Su', 3500000, 'banan1.jpg', '– Kiểu dáng thời thượng, đề cao yếu tố hiện đại và tinh tế.\r\n– Mặt ceramic bóng như gương, dày 9mm và cứng \r\n– gắn trên gỗ MDF giúp tăng độ bền, độ chắc chắn cho sản phẩm.\r\n– Sản phẩm có độ bền cao, vệ sinh dễ dàng.\r\n– Sử dụng nguyên vật liệu cao cấp đem lại độ bền cũng như sự thẩm mỹ theo thời gian.', 20, 28, 'active', 2, '2024-10-21 11:16:52', '2024-12-21 11:38:45', NULL),
(5, 'Bàn Ăn Gỗ Tràm Tự Nhiên', 4550000, 'banan2.jpg', 'An toàn cho sức khỏe, thân thiện với môi trường.\r\nCác cạnh bàn được bo tròn, đặc biệt an toàn với các gia đình có trẻ nhỏ.\r\nDễ dàng vệ sinh sau khi sử dụng.\r\nKết cấu vững chắc, bền đẹp mãi cùng thời gian.\r\nKhả năng chống trầy xước tốt, độ ổn định và độ bền cao.\r\nKiểu dáng gọn, tiết kiệm diện tích cho không gian phòng ăn.', 11, 198, 'active', 2, '2024-10-21 11:16:52', '2024-12-20 23:49:46', NULL),
(26, 'Bàn Trà Gỗ ', 2100000, 'bantra.jpg', '– Gọn nhẹ, dễ dàng di chuyển.\r\n– Kiểu dáng đơn giản nhưng hiện đại, dễ kết hợp với nhiều kiểu dáng sofa khác nhau.\r\n– Sản phẩm có độ bền cao, khả năng chống trầy xước, chịu lực tốt, ít bám bụi.\r\n– Tone màu dễ kết hợp với các sản phẩm Nội thất khác.', 10, 60, 'active', 2, '2024-10-21 11:15:33', '2024-12-20 20:27:30', NULL),
(27, 'Bàn Trà Cao Cấp', 4730000, 'bancaocap.jpg', '– Bề mặt bàn có độ mịn hoàn hảo, khả năng chống trầy xước trong quá trình sử dụng, rất dễ vệ sinh, tạo cảm giác luôn mới.\r\n– Kiểu dáng hiện đại, sang trọng, thời thượng.\r\n– Mặt ceramic bóng như gương, dày 9mm và cứng \r\n– gắn trên gỗ MDF giúp tăng độ bền, độ chắc chắn cho sản phẩm.\r\n– Mỗi bàn trà sẽ có vân bay khác nhau, tạo nên tính độc đáo cho sản phẩm.\r\n– Sản phẩm do Hoàn Mỹ sáng tạo, sản xuất trên dây chuyền công nghệ của Italia, Nhật Bản. Đạt tiêu chuẩn chất lượng ISO.', 15, 19, 'active', 2, '2024-10-21 11:15:33', '2024-12-21 10:45:59', NULL),
(29, 'Tủ Kệ Tivi Gỗ', 5990000, 'ketivi1.jpg', '– Cốt gỗ chống ẩm đạt chuẩn Châu Âu, an toàn cho sức khoẻ người sử dụng.\r\n– Kiểu dáng nhỏ gọn, tiết kiệm diện tích cho không gian, đón đầu xu hướng thời trang thịnh hành tại Châu Âu.\r\n– Tone màu gỗ, đem lại sự mộc mạc, bình dị, ấm áp cho không gian tiếp khách.', 20, 27, 'active', 5, '2024-10-21 11:15:33', '2025-08-14 17:12:57', NULL),
(30, 'Kệ Để Sách 3 Tầng', 4950000, 'kesach1.jpg', '– Được bố trí nhiều ngăn để có thể đựng sách, đồ decor cho gia đình.\r\n– Sử dụng nguyên vật liệu cao cấp đem lại thẩm mỹ và độ bền cao với thời gian.\r\n– Thiết kế với màu sắc hiện đại.', 11, 9, 'active', 3, '2024-11-30 11:53:29', '2024-12-21 10:46:55', NULL),
(36, 'Tủ Giày Gỗ', 10000000, 'tugiay1.jpg', 'Bảo hành sản phẩm 24 tháng\r\nBảo trì trọn đời sản phẩm', 5, 100, 'active', 5, '2024-12-20 20:32:54', '2024-12-20 20:32:54', NULL),
(37, 'Gương Tròn', 1300000, 'guong1.jpg', '– Khung sắt sơn tĩnh điện có độ bền cao, an tâm sử dụng.\r\n– Kiểu dáng nhỏ gọn, thời trang và tinh tế.\r\n– Sản phẩm có thể thay đổi kích thước, hình dáng gương theo yêu cầu của khách hàng.', 3, 45, 'active', 4, '2024-12-20 20:33:55', '2024-12-20 20:33:55', NULL),
(38, 'Tranh Trang Trí', 1200000, 'tranh1.jpg', '– Bề mặt tranh có sự pha trộn giữa độ mịn màng, mấp mô, sần sùi và sọc như chất liệu vải – tạo điểm nhấn thu hút, độc đáo cho không gian.\r\n– Sản phẩm có độ bền màu cao, tuổi thọ sử dụng lâu dài.\r\n– Tranh có chiều sâu, nét vẽ chân thật. Màu sơn dầu đem lại hiệu ứng thẩm mỹ cao, không mốc không phai như tranh in.', 10, 56, 'active', 4, '2024-12-20 20:35:01', '2024-12-20 20:35:01', NULL),
(39, 'Bình Hoa Gốm', 2250000, 'binhgom.jpg', 'Sản xuất tại Trung Quốc', 15, 100, 'active', 4, '2024-12-20 20:35:55', '2024-12-20 20:35:55', NULL),
(40, 'Ghế Ăn Cao Cấp', 5500000, 'ghe1.jpg', 'Ghế ăn bọc da PU\r\nPhần khung và chân ghế chế tác từ kim loại.', 15, 155, 'active', 1, '2024-12-20 20:36:52', '2024-12-21 10:44:38', NULL),
(41, 'Ghế Ăn Gỗ Cao Cấp', 1550000, 'ghe4.jpg', '– Ghế ăn có kiểu dáng đơn giản nhưng hiện đại, thanh lịch. Dáng ghế gọn, giúp tiết kiệm diện tích không gian phòng ăn.\r\n– Phần lưng ghế hõm vào trong, ôm trọn lưng người ngồi – tạo cảm giác thoải mái khi sử dụng.\r\nGọn nhẹ, dễ dàng di chuyển.', 10, 218, 'active', 1, '2024-12-20 20:37:54', '2025-08-14 14:19:42', NULL),
(42, 'Ghế Ăn Bọc Da Cao Cấp', 4000000, 'ghe3.jpg', 'Dù ngồi lâu, người sử dụng cũng không bị đau mỏi lưng do ghế được bọc da Pu rất êm.\r\nKết cấu chắc chắn, an tâm khi sử dụng.\r\nKiểu dáng trẻ trung, phong cách hiện đại, dễ dàng di chuyển.\r\nPhù hợp với nhiều kiểu không gian nội thất khác nhau.', 15, 139, 'active', 1, '2024-12-20 20:38:45', '2024-12-20 20:38:45', NULL),
(43, 'Gương Toàn Thân Cao Cấp', 5660000, 'gÆ°Æ¡ng5.jpg', '– Bề mặt gương sáng, kiểu dáng sang trọng và đẳng cấp.\r\n– Sản phẩm có thể thay đổi kích thước, hình dáng gương theo yêu cầu của khách hàng.\r\n– Sản xuất trên dây chuyền công nghệ của Bỉ, đảm bảo yếu tố thẩm mĩ và chất lượng.', 20, 60, 'active', 4, '2024-12-20 20:39:42', '2024-12-20 20:39:42', NULL),
(44, 'Đèn Chùm Hoa Sứ', 19900000, 'den1.jpg', 'Mang đến vẻ đẹp sang trọng và đầy tinh tế, đèn chùm treo hoa sứ là lựa chọn hoàn hảo để tôn lên không gian sống của bạn. Sản phẩm được thiết kế tỉ mỉ với các chi tiết hoa sứ thủ công, kết hợp ánh sáng ấm áp, tạo nên một tác phẩm nghệ thuật chiếu sáng độc đáo và cuốn hút.', 12, 48, 'active', 8, '2024-12-20 20:42:01', '2024-12-20 21:25:44', NULL),
(45, 'Đèn Chùm Hoa Bồ Công Anh', 19000000, 'den2.jpg', 'Mang đến vẻ đẹp sang trọng và đầy tinh tế, đèn chùm treo hoa Bồ Công Anh là lựa chọn hoàn hảo để tôn lên không gian sống của bạn. Sản phẩm được thiết kế tỉ mỉ với các chi tiết hoa sứ thủ công, kết hợp ánh sáng ấm áp, tạo nên một tác phẩm nghệ thuật chiếu sáng độc đáo và cuốn hút.', 5, 23, 'active', 8, '2024-12-20 20:44:06', '2024-12-20 21:25:01', NULL),
(46, 'Đèn Chùm Pha Lê', 16000000, 'Layer-834.png', 'Mang đến vẻ đẹp sang trọng và đầy tinh tế, đèn chùm pha lê là lựa chọn hoàn hảo để tôn lên không gian sống của bạn. Sản phẩm được thiết kế tỉ mỉ với các chi tiết hoa sứ thủ công, kết hợp ánh sáng ấm áp, tạo nên một tác phẩm nghệ thuật chiếu sáng độc đáo và cuốn hút.', 3, 15, 'active', 8, '2024-12-20 20:45:26', '2024-12-20 21:24:46', NULL),
(47, 'Bàn Gỗ Trầm Hương', 5660000, 'ban3.jpg', 'Bàn gỗ trầm là sự kết hợp hoàn hảo giữa vẻ đẹp tự nhiên và sự sang trọng, mang đến cho không gian của bạn một nét đẹp cổ điển và ấm cúng. Được chế tác từ gỗ trầm chất lượng cao, bàn gỗ trầm không chỉ sở hữu màu sắc trầm ấm, thanh lịch mà còn có độ bền vượt trội, chịu được thời gian và sự thay đổi của môi trường.', 16, 59, 'active', 2, '2024-12-20 20:47:09', '2024-12-20 20:47:09', NULL),
(48, 'Sofa Góc Ý', 21000000, 'sofa2.jpg', 'Sofa Ý là sự kết hợp hoàn hảo giữa thiết kế hiện đại và sự tinh tế trong từng chi tiết, mang đến cho không gian sống của bạn vẻ đẹp sang trọng, đẳng cấp. Được chế tác từ những chất liệu cao cấp và kỹ thuật sản xuất tiên tiến, sofa Ý không chỉ là nơi nghỉ ngơi lý tưởng mà còn là món đồ nội thất làm nổi bật không gian sống của bạn.', 6, 34, 'active', 7, '2024-12-20 20:49:13', '2024-12-20 21:26:22', NULL),
(49, 'Sofa Băng Cao Cấp', 15999000, 'sofa1.jpg', 'Sofa băng là sự kết hợp hoàn hảo giữa thiết kế hiện đại và sự tinh tế trong từng chi tiết, mang đến cho không gian sống của bạn vẻ đẹp sang trọng, đẳng cấp. Được chế tác từ những chất liệu cao cấp và kỹ thuật sản xuất tiên tiến, sofa băng không chỉ là nơi nghỉ ngơi lý tưởng mà còn là món đồ nội thất làm nổi bật không gian sống của bạn.', 5, 79, 'active', 7, '2024-12-20 20:52:12', '2024-12-20 20:53:45', NULL),
(50, 'Sofa Đơn', 8200000, 'sofa-don.png', 'Sofa với một chỗ ngồi, thích hợp cho không gian nhỏ hoặc làm ghế phụ trong phòng khách hoặc phòng làm việc.', 10, 179, 'active', 7, '2024-12-20 20:56:12', '2024-12-20 20:56:12', NULL),
(51, 'Gường Tầng Gỗ Cao Cấp', 20000000, 'guongtang.jpg', 'Giường tầng gỗ cao cấp là lựa chọn hoàn hảo cho các gia đình có không gian hạn chế, hoặc cho những ai muốn tối ưu hóa diện tích trong phòng ngủ. Với thiết kế thông minh và chất liệu gỗ tự nhiên chất lượng, sản phẩm mang lại sự kết hợp giữa tính thẩm mỹ và công năng sử dụng, đáp ứng nhu cầu nghỉ ngơi thoải mái và an toàn cho người sử dụng.', 10, 0, 'active', 6, '2024-12-20 21:03:48', '2024-12-21 10:18:38', NULL),
(52, 'Gường Tầng Gỗ Ý', 20900000, 'guong tang2.jpg', 'Giường tầng là lựa chọn hoàn hảo cho các gia đình có không gian hạn chế, hoặc cho những ai muốn tối ưu hóa diện tích trong phòng ngủ. Với thiết kế thông minh và chất liệu gỗ tự nhiên chất lượng, sản phẩm mang lại sự kết hợp giữa tính thẩm mỹ và công năng sử dụng, đáp ứng nhu cầu nghỉ ngơi thoải mái và an toàn cho người sử dụng.', 15, 19, 'active', 6, '2024-12-20 21:05:35', '2024-12-20 21:26:06', NULL),
(53, 'Đèn Cây Gỗ Thông', 2700000, 'dencay.jpg', 'Đèn cây trang trí là một sự kết hợp tuyệt vời giữa ánh sáng và nghệ thuật, mang đến cho không gian sống vẻ đẹp sang trọng và ấm áp. Với thiết kế giống như một cây cối tự nhiên, đèn cây không chỉ cung cấp ánh sáng dịu nhẹ mà còn trở thành một món đồ trang trí độc đáo, làm điểm nhấn cho mọi phòng khách, phòng ngủ hay không gian làm việc.', 15, 68, 'active', 8, '2024-12-20 21:11:32', '2024-12-20 21:11:32', NULL),
(54, 'Đèn Tre Cao Cấp', 4990000, 'dentre.jpg', 'Đèn tre là món đồ trang trí đặc biệt mang đậm nét đẹp thiên nhiên và sự mộc mạc, kết hợp giữa ánh sáng dịu nhẹ và chất liệu tre tự nhiên. Với thiết kế gần gũi, đèn tre tạo ra không gian ấm cúng, thư giãn, phù hợp cho phòng khách, phòng ngủ hoặc những không gian yêu thích phong cách giản dị và gần gũi thiên nhiên.', 5, 25, 'active', 8, '2024-12-20 21:12:36', '2024-12-20 21:12:36', NULL),
(55, 'Bàn Ăn Mặt Đá', 6999000, 'banan3.jpg', 'Bàn ăn mặt đá là sự kết hợp hoàn hảo giữa vẻ đẹp tự nhiên của đá và thiết kế tinh tế, mang lại sự sang trọng và hiện đại cho không gian phòng ăn. Với mặt bàn được làm từ đá tự nhiên hoặc đá nhân tạo cao cấp, sản phẩm không chỉ bền bỉ mà còn tạo điểm nhấn nổi bật, giúp nâng tầm không gian sống của bạn.', 5, 33, 'active', 2, '2024-12-20 21:59:01', '2024-12-20 21:59:01', NULL),
(56, 'Bàn Ăn Mâm Xoay Mặt Đá', 5699000, 'Bo-ban-an-8-ghe-tron-mat-da-xoay-nhap-A8.jpg', 'Bàn ăn mâm xoay là một lựa chọn hoàn hảo cho các gia đình hoặc không gian nhà hàng, nơi cần sự thuận tiện và tính linh hoạt trong việc sử dụng. Với thiết kế thông minh và khả năng xoay mâm, sản phẩm giúp các thành viên dễ dàng chia sẻ món ăn, tạo không khí ấm cúng và dễ dàng giao tiếp trong mỗi bữa ăn.', 10, 20, 'active', 2, '2024-12-20 22:04:06', '2024-12-20 22:04:06', NULL),
(57, 'Ghế Ăn Nhập Khẩu', 2300000, 'ghe5.png', 'Ghế ăn nhập khẩu hiện đại là sự lựa chọn lý tưởng cho không gian phòng ăn của bạn, mang đến vẻ đẹp sang trọng và tính tiện dụng cao. Được nhập khẩu từ các thương hiệu nổi tiếng, sản phẩm này không chỉ có thiết kế bắt mắt mà còn đảm bảo chất lượng và độ bền vượt trội.', 5, 56, 'active', 1, '2024-12-20 22:09:46', '2024-12-20 22:09:46', NULL),
(58, 'Ghế Đôn Tròn ', 1600000, 'ghedon.jpg', 'Ghế đôn là một món đồ nội thất nhỏ gọn nhưng rất hữu ích, thích hợp cho nhiều không gian trong nhà như phòng khách, phòng ngủ, hoặc khu vực hành lang. Với thiết kế đơn giản, ghế đôn có thể được sử dụng như một nơi ngồi thư giãn, để chân hoặc làm đồ trang trí trong không gian sống.', 5, 25, 'active', 1, '2024-12-20 22:13:21', '2025-07-26 13:40:00', NULL),
(59, 'Ghế Đôn Gối Tròn Họa Tiết', 600000, 'ghedon2.jpg', 'Ghế đôn là một món đồ nội thất nhỏ gọn nhưng rất hữu ích, thích hợp cho nhiều không gian trong nhà như phòng khách, phòng ngủ, hoặc khu vực hành lang. Với thiết kế đơn giản, ghế đôn có thể được sử dụng như một nơi ngồi thư giãn, để chân hoặc làm đồ trang trí trong không gian sống.', 0, 54, 'active', 1, '2024-12-20 22:16:35', '2025-08-14 12:30:24', NULL),
(60, 'Ghế Đôn Sofa Dài Chân Thấp', 3000000, 'ghe-don-sofa-dai-chan-thap.jpg', 'Ghế đôn là một món đồ nội thất nhỏ gọn nhưng rất hữu ích, thích hợp cho nhiều không gian trong nhà như phòng khách, phòng ngủ, hoặc khu vực hành lang. Với thiết kế đơn giản, ghế đôn có thể được sử dụng như một nơi ngồi thư giãn, để chân hoặc làm đồ trang trí trong không gian sống.', 0, 14, 'active', 7, '2024-12-20 22:18:04', '2025-07-26 13:15:09', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productsubimages`
--

CREATE TABLE `productsubimages` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refund_log`
--

CREATE TABLE `refund_log` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` enum('completed','pending') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `reviews_text` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `email` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullname`, `password`, `phone_number`, `address`, `role`, `email`, `status`, `created_at`, `updated_at`, `reset_token`, `reset_expires`, `profile_picture`) VALUES
(24, 'lamnhat', '$2a$10$Ph9BiLIehXjxcdc4yqp1sOLzvy4ng23akDz8iLB/qk2N6ALOdXtWi', '0913321123', 'Can Tho, Phường Bùi Hữu Nghĩa, Quận Bình Thuỷ, Thành phố Cần Thơ', 'admin', 'lamnhat509@gmail.com', 'active', '2024-11-22 18:15:43', '2024-12-20 16:59:26', NULL, NULL, '/uploads/logo1.png'),
(25, 'lamnhat', '$2a$10$v6DqL6sc/ZKv8BuViAWLUem.GRYyQB/2MLVDl5kcrXJwpRZ65LB/.', '0913634651', 'Can Tho, Phường Tân Phú, Quận Cái Răng, Thành phố Cần Thơ', 'user', 'nhat123321@gmail.com', 'active', '2024-11-22 18:41:26', '2024-12-20 16:59:56', 'bbb7fbdd5af1369fe27f73a2d31ec8240f92616c0421d655848d230de89bd336', '2024-11-25 05:50:05', '/uploads/logo1.png'),
(26, 'lamnhat', '$2b$10$g6HPx3LfgP3.iWr/6my.c.BM.8l7qK6NLL.fwPIoLY22yhfooiPCK', '0913634651', '', 'user', 'nhat123456@gmail.com', 'active', '2024-11-23 19:27:39', '2024-12-14 14:10:20', NULL, NULL, NULL),
(27, 'Cao Quốc Lịnh', '$2b$10$Usy.7S1/9IZfu.7FPoB2..W25VHYkpwJAlnMmnm4ZeCV5PZ1pHqPC', '0974806752', 'Cần Thơ, Phường Thường Thạnh, Quận Cái Răng, Thành phố Cần Thơ', 'admin', 'linhcqpc07070@fpt.edu.com', 'active', '2024-11-27 11:43:51', '2024-12-20 16:59:51', NULL, NULL, '/uploads/logo1.png'),
(28, 'linh', '$2b$10$3qZ5kjijwOF8lZ6FCPE8hOLEogBosGC2cFc5j.DgkthoAEd5KDXte', '0991122325', '123, Xã Thới Bình, Huyện Thới Bình, Tỉnh Cà Mau', 'admin', 'nhu11234@gmail.com', 'active', '2024-12-02 13:30:03', '2024-12-20 22:20:04', NULL, NULL, '/uploads/1.jpg'),
(30, 'linh', '$2b$10$ztPuUbfNli9BJm8qkbek2ehGuwtFxf7kn.pOh7CVMIKq1YPX3OetC', '', NULL, 'admin', 'linh12345@gmail.com', 'inactive', '2024-12-14 12:41:43', '2024-12-14 13:52:48', NULL, NULL, NULL),
(32, 'minhdien', '$2b$10$61Y0xqXftP2utXb7dTgOIO6BteEfp6ra5amRSG3O4OPXDiOwkvCWG', '', NULL, 'admin', 'dien09226675745@gmail.com', 'active', '2024-12-14 14:15:34', '2024-12-14 14:22:24', NULL, NULL, NULL),
(34, 'LE MINH DIEN1', '$2b$10$uz8jbluo.nGBEKi76w67m.xPUeglVFHHgUnVkBYPSk6P5Erg9Jj/u', '0949615859', 'P9, C30 Đ. Trần Bạch Đằng, P. An Hoà, Rạch Giá, Kiên Giang, Việt Nam, Xã Yên Nam, Thị xã Duy Tiên, Tỉnh Hà Nam', 'user', 'dien0922667574@gmail.com', 'active', '2024-12-14 15:25:04', '2024-12-14 15:38:07', NULL, NULL, NULL),
(35, 'linh1', '$2b$10$0f2NHbYPDFjr15Y9CYaSq.JpV0g1pKHFFtv6GCEqEEd..DIOkPAte', '0974806752', 'Cần Thơ, Thị trấn Tứ Kỳ, Huyện Tứ Kỳ, Tỉnh Hải Dương', 'user', 'linhcqpc11111@fpt.edu.com', 'active', '2024-12-16 07:45:59', '2024-12-16 07:47:57', NULL, NULL, NULL),
(36, 'quoclinh12', '$2b$10$nnuPBmsho5Dfi6RbpJe.N.1EW5GxoOqdS1Nm2alpjG77ailMN24XO', '', NULL, 'user', 'quoclinh12@gmail.com', 'active', '2024-12-16 08:05:14', '2024-12-16 08:05:14', NULL, NULL, NULL),
(37, 'nhan11', '$2b$10$Wxw0ml0XLqpCvr8WFksM..8p1N3h5p9KxoOyQGL3i/14rYt/K2sOu', '', NULL, 'user', '111nha11@gmail.com', 'active', '2024-12-16 10:23:39', '2024-12-16 10:23:39', NULL, NULL, NULL),
(38, 'Lê Minh Điền', '$2b$10$tHoTB5Zsrbjfj5D8ATCEOOtMhoyLo.Mcao0AGDSgDPE18EwG2fxsG', '', NULL, 'user', 'minhdienle999@gmail.com', 'active', '2024-12-16 10:55:37', '2024-12-16 10:55:49', 'f4cb3ce3d01d85ff0c3bf0fe2b1e22199dbef4bc5b9d59806a01e1ab77b6deec', '2024-12-16 11:55:49', NULL),
(39, 'tngan', '$2b$10$vWTcA0YZlpRnnYXg6lNq7e.Rkmj/q5Cqquj2EL41csEKMcgWQs1gS', '', NULL, 'admin\r\n', 'tngan123@gmail.com', 'active', '2024-12-20 20:05:56', '2024-12-20 20:06:20', NULL, NULL, NULL),
(40, 'tuitenngan', '$2b$10$LBuAclQsAU.2zm5wZ95Ry.gmXHFNRwu2tgik3WJG6bCe.VTuQ8DR6', '0991122325', '22, Xã Thới Tân, Huyện Thới Lai, Thành phố Cần Thơ', 'user', 'nganne123@gmail.com', 'active', '2024-12-20 22:29:53', '2024-12-20 22:30:30', NULL, NULL, '/uploads/hihi.jpg'),
(41, 'linh99', '$2b$10$UcQ9FGi7B4lvNADdsKK5v.gPAVBY/mnp6VclNMh0GaeFakjWb83Yy', '', NULL, 'user', 'linh12@gmail.com', 'active', '2024-12-20 23:46:55', '2024-12-20 23:46:55', NULL, NULL, NULL),
(44, 'bao', '$2b$10$ACc8NgxxUhvW/aiXPI58X.on8ptMHAr9g8ENlyTsCkLZEr5VxdMm6', '0123456789', '123, Phường An Bình, Quận Ninh Kiều, Thành phố Cần Thơ', 'admin', 'bao@gmail.com', 'active', '2025-07-26 12:47:31', '2025-08-14 12:31:26', '204f7826e59503018f3b5760e45d652ec0e8bce96d5e9c7d75f65faf8ad5635b', '2025-07-26 13:48:25', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `voucher_code` varchar(50) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_percent` decimal(5,0) DEFAULT NULL,
  `valid_from` date NOT NULL,
  `valid_to` date NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`id`, `voucher_code`, `price`, `discount_percent`, `valid_from`, `valid_to`, `status`, `created_at`, `updated_at`, `quantity`) VALUES
(13, 'DISCOUNT20', 2500000.00, 20, '2024-12-21', '2025-12-31', 'active', '2024-11-01 10:30:00', '2025-08-14 14:19:42', 8),
(14, 'DISCOUNT30', 3000000.00, 30, '2024-12-26', '2024-12-31', 'active', '2024-11-05 11:00:00', '2024-12-20 23:45:28', 50),
(15, 'NEWYEAR25', 3000000.00, 25, '2024-12-03', '2024-12-30', 'active', '2024-12-01 12:00:00', '2024-12-21 10:46:55', 2),
(16, 'FLASH25', 750000.00, 25, '2024-12-20', '2024-12-28', 'active', '2024-11-10 09:00:00', '2024-12-20 23:44:13', 0),
(17, 'XMAS15', 2500000.00, 15, '2024-12-15', '2024-12-31', 'active', '2024-12-20 21:16:02', '2024-12-20 21:18:16', 45),
(18, 'IN7SAVE15', 10000000.00, 15, '2024-12-01', '2024-12-23', 'active', '2024-12-20 21:28:10', '2024-12-20 21:33:04', 25),
(19, 'IN7HOME5', 1000000.00, 5, '2024-12-05', '2024-12-25', 'active', '2024-12-20 21:30:31', '2024-12-20 21:33:18', 30),
(20, 'IN7DECOR20', 10000000.00, 10, '2024-12-12', '2024-12-26', 'active', '2024-12-20 21:31:23', '2024-12-20 21:33:26', 20),
(21, 'IN7HAPPY', 1500000.00, 5, '2024-12-19', '2024-12-31', 'active', '2024-12-20 21:32:34', '2024-12-20 21:33:51', 27);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Chỉ mục cho bảng `key_token`
--
ALTER TABLE `key_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_voucher_id` (`voucher_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_category_id` (`post_category_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Chỉ mục cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `refund_log`
--
ALTER TABLE `refund_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`,`email`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `key_token`
--
ALTER TABLE `key_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT cho bảng `postcategory`
--
ALTER TABLE `postcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `refund_log`
--
ALTER TABLE `refund_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `key_token`
--
ALTER TABLE `key_token`
  ADD CONSTRAINT `key_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_voucher_id` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`post_category_id`) REFERENCES `postcategory` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `productsubimages`
--
ALTER TABLE `productsubimages`
  ADD CONSTRAINT `productsubimages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `refund_log`
--
ALTER TABLE `refund_log`
  ADD CONSTRAINT `refund_log_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
