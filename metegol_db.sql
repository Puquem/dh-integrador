-- / Creación de la DB
CREATE DATABASE metegol_db;
USE metegol_db;

-- / Creación de las tablas que NO tienen FK
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NULL DEFAULT 'default-user-image.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `complexes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `complex` varchar(255) NOT NULL,
  `phone` int(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'default-product-image.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `category` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `grasses` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `type` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- / Creación de las tablas que tienen FK
CREATE TABLE `fields` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image1` varchar(255) NULL DEFAULT 'default-product-image.png',
  `image2` varchar(255) NULL DEFAULT 'default-product-image.png',
  `image3` varchar(255) NULL DEFAULT 'default-product-image.png',
  `complexes_id` int(10) unsigned DEFAULT NULL,
  `grasses_id` int(10) unsigned DEFAULT NULL,
  `categories_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`complexes_id`) REFERENCES `complexes` (`id`),
  FOREIGN KEY (`grasses_id`) REFERENCES `grasses` (`id`),
  FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- / Populando las tablas
INSERT INTO `categories` VALUES 
	(DEFAULT, 'Futbol 5', NULL, NULL),
  (DEFAULT, 'Futbol 6', NULL, NULL),
	(DEFAULT, 'Futbol 7', NULL, NULL),
  (DEFAULT, 'Futbol 8', NULL, NULL),
	(DEFAULT, 'Futbol 9', NULL, NULL),
  (DEFAULT, 'Futbol 10', NULL, NULL),
	(DEFAULT, 'Futbol 11', NULL, NULL);

  INSERT INTO `grasses` VALUES 
	(DEFAULT, 'Cesped Natural', NULL, NULL),
  (DEFAULT, 'Cesped Sintético', NULL, NULL),
	(DEFAULT, 'Cemento', NULL, NULL),
  (DEFAULT, 'Piso Flotante', NULL, NULL),
	(DEFAULT, 'Goma', NULL, NULL);

  INSERT INTO `complexes` VALUES 
	(DEFAULT, 'Salguero Fútbol', '48090881', 'Rafael Obligado 1221, Palermo, Ciudad Autónoma de Buenos Aires', 'salguero.png', NULL, NULL),
	(DEFAULT, 'Barrio Parque Fútbol Club', '48014264', 'Ortiz de Ocampo 3219, Palermo, Ciudad Autónoma de Buenos Aires','barrio.jpg', NULL, NULL),
	(DEFAULT, 'El Puente', '47772446', 'Niceto Vega 5432, Palermo, Ciudad Autónoma de Buenos Aires', 'puente.png', NULL, NULL),
  (DEFAULT, 'Central Fútbol', '08108883639', 'Costa Rica 5299, Palermo, Ciudad Autónoma de Buenos Aires', 'central.jpg', NULL, NULL),
  (DEFAULT, 'Grün FC', '47031430', 'Av Crisólogo Larralde 999, Nuñez, Ciudad Autónoma de Buenos Aires', 'grun.jpg', NULL, NULL),
  (DEFAULT, 'Fútbol Urbano', '47024111', 'Campos Salles 1565, Nuñez, Ciudad Autónoma de Buenos Aires', 'urbano.jpg', NULL, NULL),
  (DEFAULT, 'La Esquina', '1520561899', ' Miñones 1720, Belgrano, Ciudad Autónoma de Buenos Aires', 'esquina.jpg', NULL, NULL),
  (DEFAULT, 'Saavedra Parque Fútbol', '45456936', 'Av. Ruiz Huidobro 3715, Saavedra, Ciudad Autónoma de Buenos Aires','saavedra.jpg', NULL, NULL),
  (DEFAULT, 'Nueva Generación', '43044748', 'Rincón 1326, San Cristobal, Ciudad Autónoma de Buenos Aires', 'nueva.jpg', NULL, NULL),
  (DEFAULT, 'Caballito Norte', '44313996', 'Avellaneda 1423, Caballito, Ciudad Autónoma de Buenos Aires', 'caballito.png', NULL, NULL),
  (DEFAULT, 'Il Capo Fútbol', '43044748', 'Combate de los Pozos 1868, Parque Patricios, Ciudad Autónoma de Buenos Aires', 'ilcapo.png', NULL, NULL),
  (DEFAULT, 'Distrito Fútbol', '1531992806', 'Jose Hernandez 1310, Belgrano, Ciudad Autónoma de Buenos Aires', 'distrito.png', NULL, NULL);