
## V1

对应了server-mock/api目录下的的模拟接口

**登录**

```js
fetch('/api/vue-admin-template/user/login', {method: 'post',    headers: {
        'Content-Type': 'application/json'
    }, body: JSON.stringify({username: 'admin'})}).then(result => result).then(data => console.log('data', data))
```


**请求用户信息**

```js
fetch('/api/vue-admin-template/user/info?token=admin-token').then(result => result).then(data => console.log('data', data))
```

**请求列表**

```js
fetch('/api/vue-admin-template/table/list').then(result => result).then(data => console.log('data', data))
```