
/**
 * 使用Fetch API的简单GET请求
 */


fetch('{url}').then(response => console.log(response));

/**
 * 使用Fetch API的简单POST请求
 */


fetch('{url}', {
    method: 'post'
}).then(response => console.log(response));

/**
 * 在Fetch API中使用授权令牌 (Bearer) 进行GET
 */


fetch('{url}', {
    headers: {
        'Authorization': 'Basic {token}'
    }
}).then(response => console.log(response));

/**
 * 在Fetch API中使用查询字符串数据进行GET
 */


fetch('{url}?var1=value1&var2=value2')
    .then(response => console.log(response));

/**
 * 在Fetch API中使用CORS进行GET
 */


fetch('{url}', {
    mode: 'cors'
}).then(response => console.log(response));

/**
 * 在Fetch API中使用授权令牌和查询字符串数据进行POST
 */


fetch('{url}?var1=value1&var2=value2', {
    method: 'post',
    headers: {
        'Authorization': 'Bearer {token}'
    }
}).then(response => console.log(response));

/**
 * 在Fetch API中使用表单数据进行POST
 */


let formData = new FormData();
formData.append('field1', 'value1');
formData.append('field2', 'value2');

fetch('{url}', {
    method: 'post',
    body: formData
}).then(response => console.log(response));

/**
 * 在Fetch API中使用JSON数据进行POST
 */


fetch('{url}', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'field1': 'value1',
        'field2': 'value2'
    })
})
    .then(response => console.log(response));

/**
 * 在Fetch API中使用JSON数据和CORS进行POST
 */


fetch('{url}', {
    method: 'post',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'field1': 'value1',
        'field2': 'value2'
    })
})
    .then(response => console.log(response));