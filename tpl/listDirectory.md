## 用法

在`edp`中，通常不需要显式地配置`listDirectory`，如果在`edp-webserver-config.js`中配置了`directoryIndexes`，
使用`file`，并且访问一个目录，则会打印出该目录列表。

```javascript
{
    location: /^.*$/,
    handler: [
        file()
    ]
}
```
