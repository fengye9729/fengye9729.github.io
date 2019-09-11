# axios 

- 结合 axios , `axios.get()` 返回的是 Promise 实例吗
- `axios.all` `axios.spread`
## axios 特点
- 从浏览器生成 **XMLHttpRequests** （这玩意是什么， 见文末
- 从nodejs 发起 http 请求
- 支持 **Promise** API
- 拦截请求与响应
- 转换请求与响应数据
- 请求取消
- 自动转换 JSON 数据
- 客户端支持预防 XSRF

## axios 拦截器 interceptors
config 里面的参数，一般要注意的是 config.headers ，配置 Authorization
```js
// request 拦截器
axios.interceptors.request.use(config => {
// dosomething before request send 
// 发送请求前对 config 中的内容进行修改，可以添加头信息，etc
  return config // 方式一
  return new Promise((resolve, reject) => { // 方式二 返回一个 Promise 对象
	  // ...
  }) 
}, error => {
// do something with request error
  return Promise.reject(error)
})

// response 拦截器
axios.interceptors.response.use(config => {
// dosomething with response data 
// 处理响应回来的数据
	return config // 方式一
  if(config.data.code !== 0) { // 方式二：返回一个 Promise 对象，可以根据服务器返回的错误码进行判断
    return Promise.reject(config)
  }
}, error => {
// dosomething width response error 
// 当响应出错的时候
  return Promise.reject(error)
})

// 如果稍后你需要移除拦截器
const myInterceptor = axios.interceptors.request.use(func....)
axios.interceptors.request.eject(myInterceptor)

// 可以将拦截器添加到 axios自定义的实例中
const instance = axios.create()
instance.interceptors.request.use(....)
```

## axios 处理错误
```js
axios.get('/xxx/xxx')
    	.catch(error => {
        if(error.response) {
    		// 请求发出，服务器的响应状态码不在2XX 范围
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if(error.request) {
    			// 请求发出，未收到任何答复
    			console.log(error.request);
        } else {
    		  console.log('Error', error.message)
    		}
    		console.log(error.config);
      })
```

## axios 取消 cancel

```js
// 方式一
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 参数可选，参数传递一个取消请求的相关信息，在 catch 钩子函数里能获取到
source.cancel('Operation canceled by the user.');

// ----------------------------
// 方式二
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
// 可以使用相同的cancel令牌取消多个请求
```
[取消请求的使用案例分析](https://github.com/ohhoney1/notes/issues/3)

## axois API

将相关配置传递给 axios 来进行请求

- axios(config)
- axios(url[,config])
- 请求方法别名
    - axios.request(config)
    - axios.get(url[,config])
    - axios.delete(url[,config])
    - axios.head(url[,config])
    - axios.options(url[,config])
    - axios.post(url[, data[, config]])
    - axios.put(url[, data[, config]])
    - axios.patch(url[, data[, config]])
- **处理并发**
    - axios.all(iterable)
    - axios.spread(callback)
- 创建一个实例
    axios.create([config])

## 响应架构
```js
{
  data
	status
	statusText
	headers
	config
	request
}
```

## 请求配置
[详见官网](https://github.com/axios/axios)

## 业务中高级需求：
当业务上， axios 作为项目的底层库开发时，为了考虑方法的通用性和一致性，可以自定义 axios 库，不过需要注意：
- 不改变 axios 的默认行为，去做一些请求的封装
- 基本上请求是同一个域名，当服务器迁移时，如何能更加便捷的修改请求，以适应当前的服务器情况
- 请求头信息，很多请求都要附带，比如 `token`  `auth`
- 服务器返回的是有规则的响应，如何统一过滤，而不必每个请求都单独写
- 需要足够的可配置

```js
import axios from 'axios'
/* 创建一个新的 axios 对象，确保原有的对象不变 */
let axiosWrap = axios.create({
    baseURL: /* 服务器的根路径 */,
    headers: {
        /* 一些公用的 header */
        'token': appInfo.token
    },
    transformRequest:[function (data, header){
        /* 自定义请求参数解析方式（如果必要的话） */
    }],
    paramsSerializer:function(params){
        /* 自定义链接参数解析方式（如果必要的话） */
    }
})
  
/* 过滤请求 */
axiosWrap.interceptors.request.use((config) => {
    return config
})
  
/* 过滤响应 */
axiosWrap.interceptors.response.use((result) => {
    /* 假设当code为0时代表响应成功 */
    if (result.data.code !== 0) {
        return Promise.reject(result)
    }
    return result.data.data
}, result => {
    return Promise.reject(result)
})
  
export default axiosWrap
```

## XMLHttpRequest
使用 `XMLHttpRequest` (XHR）可以与服务器交互，可以从 URL 获取数据，无须刷新整个页面。这使得页面可以**局部更新**，而不影响用户的操作。`XMLHttpRequest` 在 Ajax 编程中广泛使用。`XMLHttpRequest` 可以获取任意类型的数据，不仅仅是 XML，还支持 HTTP 以外的协议。（包括文件和 ftp)

## axios 处理多个并发请求
- 各个请求之间无关联
    - `Axios.all()`   ======》 联系到 `Promise.all()`
    - `axios.get()` 返回什么
    - `axios.all()` vs `Promise.all`
    - `axios.all` 的返回值通过 `axois.spread` 处理的结果是什么
- 各个请求之间有关联，需要顺序执行
    - 回调


## 用过什么 xhr 封装库？（axios、fetch，各家长短？有啥坑吗？）
