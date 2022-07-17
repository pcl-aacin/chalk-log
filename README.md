<p align=center><img src="chalk-log-pro.png" width="320px" /></p>
<h1 align="center" name="chalk-log">ChalkLog</h1>
<p align="center">
  <em>A friendly terminal log output library based on chalk encapsulation</em>
</p>
<p align="center">
  
![Github Stars](https://img.shields.io/github/stars/pcl-aacin/chalk-log.svg)
![Chalk Version](https://img.shields.io/badge/chalk-%3C%204.1.2-lightgrey)
![license](https://img.shields.io/badge/LICENSE-GNU--3.0-brightgreen)
![Author](https://img.shields.io/badge/Author-pcl--aacin-green)
</p>

[中文](README.cn.md)

## Why to develop ChalkLog?

Because when I added the log output code of the express project, I found that if I directly used chat, there would be many repeated fragments in the code, and it was too complex. So I encapsulated this simple library on the basis of chalk.

## How to use?
### Install [chalk](https://www.npmjs.com/package/chalk) (Version less 5)
Chalk no longer supports the import of require() in nodejs after version 5, so you choose to use version 4 chalk. I will consider adapting chalks after version 5 in the future
```
npm install --save chalk@4
```

### Require ChalkLog
1) First download chalklog and put it into your nodejs project, or you can use npm

```
npm i chalk-log-plus
```

2) Then call chalklog
``` node
// File
const log = require("./chalk-log")

// Module
const log = require("chalk-log-plus")
```

### Code supported
```log``` is a class, including the following functions

+ add
+ output

Initializing class

``` node
const clog = new log();
```

When initializing, you can consider adding prefixes. Chalklog has the following prefix presets (preset_class)

+ info
+ error
+ success
+ connect

For example

``` node
// Case insensitive
const clog = new log("info");
```

If these prefix presets can't satisfy you, you can also define the chalk style yourself

``` node
// The following codes are equivalent to "chalk.rgb(0,0,0).bold"

// 1
const chalk = require("chalk");
const clog = new log(chalk.rgb(0,0,0).bold,"text");

// 2
const clog = new log("rgb(0,0,0).bold","text");

// 3
const clog = new log([ "rgb(0,0,0)","bold" ],"text");
```

The add() function can append output

If you only need to output content without font style matching, you only need to pass in one parameter: output content

``` node
clog.add("infomations")
```

Otherwise, you need to pass in the following two parameters

The first parameter can be the preset color name. Chalklog provides the following color presets (preset_color)

+ host
+ error

As in initialization, if the preset color cannot meet your needs, you can also define it yourself in the same way as in initialization

The second parameter is the output content

Finally, the content is output only when output() is called

``` node
clog.output();
```

After using output() to output, you can still use add() to continue appending content and output again with output()

### Abbreviation supported
this code

``` node
const clog = new log("rgb(0,0,0).bold","text");
clog.add("infomations")
clog.output();
```

It can be abbreviated as

``` node
new log("rgb(0,0,0).bold","text").add("infomations").output();
```

It should be noted that if you use the shorthand method, you cannot use add() to continue adding content or output() to output after using output()

## Writing attention
1) You don't need to pay too much attention to the writing method when passing in the custom style of non chalk function (for example, when bold is required, "bold" and "bold()" are both OK)

<p align="center">I am still learning nodejs. If the program reports errors, please feed back in issues. Thank you for using!</p>
