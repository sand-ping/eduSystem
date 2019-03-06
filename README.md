# backSys
教务系统的服务端代码

# frontSys
教务系统的前端代码

# database
数据库结构


# 部署
1、使用前必须要要有node环境
2、建立数据库
在mysql数据库上新建edusys数据库，然后右键此数据库->运行SQL文件->选择database目录下的文件（编码是utf-8）->点击开始便会生成一个数据库
3、安装依赖
分别在backSys和frontSys目录运行以下代码
npm install
4、运行项目
在backSys目录下运行npm run start
在frontSys目录下运行npm run dev

