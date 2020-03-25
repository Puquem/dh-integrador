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
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `category` varchar(255) NOT NULL,
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
  `categories_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`complexes_id`) REFERENCES `complexes` (`id`),
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

INSERT INTO `users` VALUES 
	(DEFAULT, 'Rick', 'Sanchez', 'rick@mail.com', '12345678', 'rick.jpg', NULL, NULL),
	(DEFAULT, 'Morty', 'Smith', 'morty@mail.com', '12345678', 'morty.jpg', NULL, NULL),
  (DEFAULT, 'Summer', 'Smith', 'summer@mail.com', '12345678', 'summer.jpg', NULL, NULL),
  (DEFAULT, 'Jerry', 'Smith', 'jerry@mail.com', '12345678', 'jerry.jpg', NULL, NULL),
  (DEFAULT, 'Mr.', 'Meeseeks', 'meeseeks@mail.com', '12345678', 'meeseeks.jpg', NULL, NULL),
  (DEFAULT, 'Mr.', 'Poopybutthole', 'poopy@mail.com', '12345678', 'poopy.jpg', NULL, NULL),
  (DEFAULT, 'Evil', 'Morty', 'evil@mail.com', '12345678', 'evilmorty.jpg', NULL, NULL),
	(DEFAULT, 'Snuffles', 'Smith', 'snuffles@mail.com', '12345678', 'snuffles.jpg', NULL, NULL);

  INSERT INTO `complexes` VALUES 
	(DEFAULT, 'Salguero Fútbol', '48090881', 'Rafael Obligado 1221, Palermo, Ciudad Autónoma de Buenos Aires', NULL, NULL),
	(DEFAULT, 'Barrio Parque Fútbol Club', '48014264', 'Ortiz de Ocampo 3219, Palermo, Ciudad Autónoma de Buenos Aires', NULL, NULL),
	(DEFAULT, 'El Puente', '47772446', 'Niceto Vega 5432, Palermo, Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'Villas Club', '47777500', 'Valentín Alsina 1450, Palermo, Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'Grün FC', '47031430', 'Av Crisólogo Larralde 999, Nuñez, Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'Fútbol Urbano', '47024111', 'Campos Salles 1565, Nuñez, Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'La Terraza', '47020235', 'Av. Cabildo 3432, Belgrano, Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'El Parque Fútbol', '48078282', 'Brig. Gral. Facundo Quiroga s/n, Recoleta, Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'Nueva Generación', '43044748', 'Rincon 1326, San Cristobal,Ciudad Autónoma de Buenos Aires', NULL, NULL),
  (DEFAULT, 'Open Gallo', '48629392', 'Gallo 241, Abasto, Ciudad Autónoma de Buenos Aires', NULL, NULL);