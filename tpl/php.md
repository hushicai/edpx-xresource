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