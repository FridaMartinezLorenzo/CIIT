-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-04-2024 a las 03:36:57
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ciit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `id_empresa` bigint NOT NULL AUTO_INCREMENT,
  `nombre_empresa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rfc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `fecha` text COLLATE utf8mb4_general_ci NOT NULL,
  `fotito` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_empresa`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nombre_empresa`, `direccion`, `rfc`, `telefono`, `descripcion`, `description`, `fecha`, `fotito`) VALUES
(1, 'corana s.a de c.v', 'Calle 13', '546546', '', '', '', '', 1),
(3, 'pepsi s.a de c.v', 'Calle 13', '546546', '2132', '', '', '', 1),
(4, 'intel', 'Calle 14', '654321', '3221', '', '', '', 0),
(6, 'coca ', '1', '121', '1', '122', '1211', '2024-04-19', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertalaboral`
--

DROP TABLE IF EXISTS `ofertalaboral`;
CREATE TABLE IF NOT EXISTS `ofertalaboral` (
  `idOferta` bigint NOT NULL AUTO_INCREMENT,
  `salario` float NOT NULL,
  `puesto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `position` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_empresa` bigint NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `horario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idOferta`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertalaboral`
--

INSERT INTO `ofertalaboral` (`idOferta`, `salario`, `puesto`, `position`, `id_empresa`, `descripcion`, `description`, `horario`) VALUES
(1, 8000, 'Jefe', 'Boss', 1, 'Encargarse de toda la administración de la empresa', 'Take care of all the administration of the company', '7 am- 6pm'),
(2, 5000, 'Gerente de limpieza', 'Cleaning manager', 1, 'servicio de limpieza', 'Cleaning service', '6 am- 5pm'),
(3, 6000, 'Administrador', 'Administrator', 3, 'administrar inventario', 'Manage Inventory', '7 am- 6pm'),
(4, 5000, 'Secretaria', 'Secretary', 2, 'Puesto fijo', 'Fixed position', '9 am - 5 pm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta_empresa`
--

DROP TABLE IF EXISTS `oferta_empresa`;
CREATE TABLE IF NOT EXISTS `oferta_empresa` (
  `idEmpresa` bigint NOT NULL,
  `idOferta` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oferta_empresa`
--

INSERT INTO `oferta_empresa` (`idEmpresa`, `idOferta`) VALUES
(1, 2),
(1, 1),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` bigint NOT NULL AUTO_INCREMENT,
  `nombre_rol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name_rol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `name_rol`) VALUES
(1, 'Administrador', 'Administrator'),
(3, 'Usuario', 'User'),
(8, 'Jefe de Operaciones', 'Operation Boss'),
(9, 'Prueba', 'Test'),
(10, 'palero', 'palero en ingles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `correo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_Rol` bigint NOT NULL,
  `contrasena` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fotito` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `id_Rol`, `contrasena`, `fotito`) VALUES
(1, 'Juanito Perez Camacho', 'ejemplito@gmail.com', 1, '$2b$10$BlxJLZCbhDOlw5y9Bflm8.8GtMuXSl1yOyJ/lNUtcSSwdpDQ1eGWa', 1),
(2, 'Alejandro Rosas', 'Ale@gmail.com', 1, '$2b$10$2Iyvv44GZN/UaMCPQz5B5OMXFLkgegrGH8XesCfjus6A6HH6z.MZm', 1),
(4, 'Angel Cruz', 'Angel@gmail.com', 1, '$2b$10$FyruYKi5bnAkYa/dmGsouugDFCviSPeAxKCqPabHdkZSLxAvoCUqO', 1),
(11, 'Luis', 'Luis@gmail.com', 3, '$2b$10$3GH8WrHg71pO4b5jvktg4ucpBSQGGq/WGiivZOVYITOpgnJsfiQrC', 1),
(12, 'Pablo', 'Pablo@gmail.com', 1, '$2a$10$B4EnzCk0MNFZ5tm5.rlnU.EpGWLet7HxtGgPtm7pvDZMBgJ3LLRWW', 0),
(13, 'Mario', 'Mario@gmail.com', 1, '$2a$10$gtE/..4T83zwX5svIOlw7u9XwurDFng8DKr.14N45He5vwpeMcTeG', 0),
(17, 'Daniel', 'Daniel@gmail.com', 1, '$2a$10$7AuQtBQ/M7Wy.Va3ajmZJ.EELVMZdMJv3rFlTvxExTE4l2WBG3h4K', 0),
(16, 'Ricardo', 'Ricardo@gmail.com', 1, '$2a$10$TTPHQAOI/A8ru4nP34OD5uMAyj3JtSf8fX5eDrRsp8nRlC1nQx25y', 0),
(18, 'Estefania', 'Estefania@gmail.com', 1, '$2a$10$SQ9WOC2EsBkgVkYKLfEoU.NunYk0F7EJ1zVDXpXxm3gRWT6yWwxlK', 0),
(19, 'Monserrat', 'Monserrat@gmail.com', 1, '$2a$10$c14Y15UlXmjrdSpB9oRD4ew.iem36EZEBYHsGUJa25oTzGNqT2BDi', 0),
(20, 'Cecilia', 'Cecilia@gmail.com', 0, '$2a$10$qMedl5nkRmsCbaraZBp4oOSqBkl5mbpOyun4f/Ou68a0hM17ZgdfS', 0),
(21, 'Fernanda', 'Fernanda@gmail.com', 0, '$2a$10$pu4SyN2Js4oYfbpJxO/Wt.7tNkpxnIhBv2f15h08f4qhthGIu3NjW', 0),
(22, 'pruebas', 'pruebas602a@gmail.com', 8, '$2a$10$Rd2/J1obKW54G4VYDO4pBe1J6iDd8pRyZOxdnDfUSGXeU7koYJH6m', 1),
(23, 'ramon', 'ramon@gmail.com', 3, '$2a$10$piKubxWALb9PQjkJhD.rpOlpDE8AkY/OELt/zPzmOu1vlyRMOZFky', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
