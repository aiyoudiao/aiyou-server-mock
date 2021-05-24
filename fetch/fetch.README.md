## 如何处理Fetch API请求的结果

Fetch API返回一个Promise。这就是为什么我总是使用 .then() 和回调函数来处理响应的原因：

``` js
fetch(...).then(response => {
   // process the response
}
```
但是，如果你处于异步函数中，也可以等待结果：

``` js
async function getData(){
  let data = await fetch(...);
   // process the response
}
```

现在让我们看一下如何从响应中提取数据：

### 如何检查Fetch API响应的状态码

发送POST，PATCH和PUT请求时，我们通常对返回状态代码感兴趣：


``` js
fetch(...).then(response => {
  if (response.status == 200){
    // all OK
  } else {
    console.log(response.statusText);
  }
});
```

### 如何获取Fetch API响应的简单值

某些API端点可能会发回使用你的数据创建的新数据库记录的标识符：

``` js
var userId;

fetch(...)
    .then(response => response.text())
    .then(id => {
        userId = id;
        console.log(userId)
    });
```

### 如何转换Fetch API响应的JSON数据

但是在大多数情况下，你会在响应正文中接收JSON数据：

``` js
var dataObj;

fetch(...)
    .then(response => response.json())
    .then(data => {
        dataObj = data;
        console.log(dataObj)
    });
```

请记住，只有在两个Promises都解决后，你才能访问数据。这有时会让人有点困惑，所以我总是喜欢使用async方法并等待结果。

``` js
async function getData(){
    var dataObj;

    const response = await fetch(...);
    const data = await response.json();
    dataObj = data;
    console.log(dataObj);
}
```
