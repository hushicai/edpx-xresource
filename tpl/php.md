## 前提

首先，确保你已经安安装了`php-cgi`可执行程序，如果没有，请先安装之。

- mac用户

直接使用`brew`安装即可，具体可参考[这里](https://github.com/Homebrew/homebrew-php)

__Note: 安装时，请加上`--with-cgi`参数。__

- windows用户

可直接安装[这个](http://windows.php.net/downloads/releases/archives/php-5.3.4-nts-Win32-VC6-x86.msi)。

__Note: 安装过程中，请选择`other-cgi`模式。__

## 用法
 
在`edp-webserver-config.js`配置文件中，添加一个location。

### 使用内置php

```javascript

{
    location: /\.php($|\?)/,
    handler: [
        php()
    ]
}
```

### 使用node-phpcgi

安装依赖：

```bash
npm install node-phpcgi --save-dev
```

配置：

```javascript
{
    location: /\.php($|\?)/,
    handler: [
        require('node-phpcgi/edp')()
    ]
}
````