<p align=center><img src="https://github.com/pcl-aacin/chalk-log/raw/main/chalk-log-pro.png" width="320px" /></p>
<h1 align="center" name="chalk-log">ChalkLog</h1>
<p align="center">
  <em>一个友好的基于chalk封装的日志输出库（中文才是本色出演！）</em>
</p>
<p align="center">
  
![Github Stars](https://img.shields.io/github/stars/pcl-aacin/chalk-log.svg)
![Chalk Version](https://img.shields.io/badge/chalk-%3C%204.1.2-lightgrey)
![license](https://img.shields.io/badge/LICENSE-GNU--3.0-brightgreen)
![Author](https://img.shields.io/badge/Author-pcl--aacin-green)
</p>

[English](README.md)

## 为什么要开发这玩意儿

因为我在给一个express项目添加日志输出的时候，发现如果直接使用chalk，会导致代码重复片段过多，并且有些多余。所以我就简简单单的封装了一个库。

## 怎么食用
### 安装[chalk](https://www.npmjs.com/package/chalk) (版本低于且不是5)
chalk在版本5后不再支持在nodejs中require()导入，所以选择使用版本4的chalk。未来将会考虑适配版本5以后的chalk
```
npm install --save chalk@4
```

### Require ChalkLog
1) 首先下载该项目并置于你的项目中

2) 然后调用这个库
``` node
const log = require("./chalk-log")
```

### 代码使用
```log```是一个class类，包括以下函数

+ add
+ output

初始化

``` node
const clog = new log();
```

初始化时，可以考虑加入前缀，ChalkLog有以下前缀预设

+ info
+ error
+ success
+ connect

例如

``` node
// 对大小写并不敏感
const clog = new log("info");
```

如果这些前缀预设无法满足你，你还可以自己定义chalk样式

``` node
// 以下代码都相当于设置了“chalk.rgb(0,0,0).bold”样式

// 1
const chalk = require("chalk");
const clog = new log(chalk.rgb(0,0,0).bold,"text");

// 2
const clog = new log("rgb(0,0,0).bold","text");

// 3
const clog = new log([ "rgb(0,0,0)","bold" ],"text");
```

add()函数可以追加输出

如果你只需要输出内容，而不需要字体样式搭配，你只需要传入一个参数：输出的内容

``` node
clog.add("infomations")
```

输出的内容。否则，你需要传入两个参数

第一个参数可以为预设颜色名字，ChalkLog提供了以下颜色预设 (preset_color)

+ host
+ error

如同初始化的时候一样，如果预设颜色无法满足你，你也可以自己定义，方式与初始化的时候一样

第二个参数则是输出的内容

最后，只有调用output()时才会输出内容

``` node
clog.output();
```

在使用output()输出后，您仍可以使用add()继续追加内容，并再次用output()输出

### 简写支持
这段代码

``` node
const clog = new log("rgb(0,0,0).bold","text");
clog.add("infomations")
clog.output();
```

可以简写成这样

``` node
new log("rgb(0,0,0).bold","text").add("infomations").output();
```

需要注意的是，如果采用简写的方法，在使用output()输出后，你无法使用add()继续追加内容，也无法使用output()输出

## 书写注意
1) 在传入非chalk函数的自定义样式时，你不需要太过于注意书写方法（例如当需要粗体时，“bold”与“bold()”都是可以的）

<p align="center">本人仍在学习nodejs，若程序报错请在issues反馈，感谢使用！</p>
