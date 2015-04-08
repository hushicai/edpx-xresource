## 用法

`file`接受一个参数filename，如果指定了文件，则会读取该文件，否则根据请求的路径`pathname`输出文件内容。

- 如果目标是一个目录，则会调用`listDirectory`输出目录文件列表。
- 如果目标是一个文件，则直接输出文件内容。

```javascript
{
    location: /\/path\/to\/filename/,
    handler: [
        file()
    ]
}
```

