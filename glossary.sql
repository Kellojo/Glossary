/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : glossary

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2017-09-09 14:42:58
*/

SET FOREIGN_KEY_CHECKS=0;
use Glossary;

-- ----------------------------
-- Table structure for `sources`
-- ----------------------------
DROP TABLE IF EXISTS `sources`;
CREATE TABLE `sources` (
  `sID` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(1000) NOT NULL,
  PRIMARY KEY (`sID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sources
-- ----------------------------

-- ----------------------------
-- Table structure for `tables`
-- ----------------------------
DROP TABLE IF EXISTS `tables`;
CREATE TABLE `tables` (
  `tID` int(11) NOT NULL AUTO_INCREMENT,
  `tableName` varchar(100) NOT NULL,
  `oID` int(11) NOT NULL,
  PRIMARY KEY (`tID`),
  KEY `owner ID` (`oID`),
  CONSTRAINT `owner ID` FOREIGN KEY (`oID`) REFERENCES `users` (`uID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tables
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `datetimeOfRegistration` datetime NOT NULL,
  PRIMARY KEY (`uID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Kellojo', '$2y$12$xpTP8G1PRO8.4A9PYIC8e.ABi/H52gdSL5JHvSLhT5lZFlFW2ukVC', '2017-09-09 13:44:19');

-- ----------------------------
-- Table structure for `words`
-- ----------------------------
DROP TABLE IF EXISTS `words`;
CREATE TABLE `words` (
  `wID` int(11) NOT NULL AUTO_INCREMENT,
  `tID` int(11) NOT NULL,
  `word` varchar(500) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `sID` int(11) DEFAULT NULL,
  `datetimeOfInsertion` datetime NOT NULL,
  PRIMARY KEY (`wID`),
  KEY `source ID` (`sID`),
  KEY `table ID` (`tID`),
  CONSTRAINT `source ID` FOREIGN KEY (`sID`) REFERENCES `sources` (`sID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `table ID` FOREIGN KEY (`tID`) REFERENCES `tables` (`tID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of words
-- ----------------------------
