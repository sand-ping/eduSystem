/*
Navicat MySQL Data Transfer

Source Server         : 百度173
Source Server Version : 50173
Source Host           : 106.13.32.42:3306
Source Database       : edusys

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2019-03-06 09:50:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college` (
  `col_id` int(11) NOT NULL AUTO_INCREMENT,
  `col_num` varchar(6) NOT NULL,
  `col_name` varchar(20) NOT NULL,
  `col_province` varchar(20) DEFAULT NULL,
  `col_city` varchar(20) DEFAULT NULL,
  `col_area` varchar(20) DEFAULT NULL,
  `sch_id` int(11) DEFAULT NULL,
  `tea_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`col_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES ('1', '000001', '计算机工程学院', null, null, null, '1', null);

-- ----------------------------
-- Table structure for cou_class
-- ----------------------------
DROP TABLE IF EXISTS `cou_class`;
CREATE TABLE `cou_class` (
  `cou_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `cou_id` int(11) NOT NULL,
  `s_class_id` int(11) NOT NULL,
  `cou_class_date` date DEFAULT NULL,
  `cou_class_order` int(1) DEFAULT NULL,
  PRIMARY KEY (`cou_class_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cou_class
-- ----------------------------

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `cou_id` int(11) NOT NULL AUTO_INCREMENT,
  `cou_name` varchar(20) NOT NULL,
  `cou_necessity` int(1) DEFAULT NULL,
  `tea_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cou_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `major_id` int(11) NOT NULL AUTO_INCREMENT,
  `major_num` varchar(10) NOT NULL,
  `major_name` varchar(20) NOT NULL,
  `col_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`major_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of major
-- ----------------------------

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `man_id` int(11) NOT NULL AUTO_INCREMENT,
  `man_num` varchar(20) NOT NULL,
  `man_name` varchar(10) NOT NULL,
  `man_sex` int(1) NOT NULL,
  `man_psw` varchar(20) DEFAULT NULL,
  `man_nation` varchar(20) DEFAULT NULL,
  `man_identity_card` varchar(20) DEFAULT NULL,
  `man_birth_date` date DEFAULT NULL,
  `man_photo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`man_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('1', '201802030001', '张管理', '0', '123456', '中华人民共和国', null, null, null);

-- ----------------------------
-- Table structure for s_class
-- ----------------------------
DROP TABLE IF EXISTS `s_class`;
CREATE TABLE `s_class` (
  `s_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_class_name` varchar(20) NOT NULL,
  `s_class_date` varchar(10) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `tea_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`s_class_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_class
-- ----------------------------

-- ----------------------------
-- Table structure for school
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school` (
  `sch_id` int(11) NOT NULL AUTO_INCREMENT,
  `sch_num` varchar(10) NOT NULL,
  `sch_name` varchar(20) NOT NULL,
  `sch_province` varchar(20) DEFAULT NULL,
  `sch_city` varchar(20) DEFAULT NULL,
  `sch_area` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`sch_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('1', '000001', '集美大学', '福建省', '厦门市', '集美区');

-- ----------------------------
-- Table structure for score_cou_stu
-- ----------------------------
DROP TABLE IF EXISTS `score_cou_stu`;
CREATE TABLE `score_cou_stu` (
  `cou_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `score` int(3) DEFAULT NULL,
  `cou_stu_date` date DEFAULT NULL,
  PRIMARY KEY (`cou_id`,`stu_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of score_cou_stu
-- ----------------------------

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_num` varchar(20) NOT NULL,
  `stu_name` varchar(10) NOT NULL,
  `stu_sex` int(1) NOT NULL,
  `stu_psw` varchar(20) DEFAULT NULL,
  `stu_nation` varchar(20) DEFAULT NULL,
  `stu_identity_card` varchar(20) DEFAULT NULL,
  `stu_birth_date` date DEFAULT NULL,
  `stu_photo` varchar(200) DEFAULT NULL,
  `s_class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`stu_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `tea_id` int(11) NOT NULL AUTO_INCREMENT,
  `tea_num` varchar(20) NOT NULL,
  `tea_name` varchar(10) NOT NULL,
  `tea_sex` int(1) NOT NULL,
  `tea_psw` varchar(20) DEFAULT NULL,
  `tea_nation` varchar(20) DEFAULT NULL,
  `tea_identity_card` varchar(20) DEFAULT NULL,
  `tea_birth_date` date DEFAULT NULL,
  `tea_photo` varchar(200) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tea_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
