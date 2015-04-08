## 用法

```javascript
{
    // 定义url匹配
    location: /\/xxx-url/,
    handler: [
        // 注意header key的大小写

        // 在http协议中，header key是大小写不敏感的 
        // @see: http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2

        // edp会把header key全部变成小写（nodejs也是这么干的）
        // 但php却会把用`-`分开的每个单词首字母变成大写
        addRequestHeader({'X-By': 'xresource'})
    ]
}
```
