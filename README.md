# Koa-React-mysql SSR 服务端渲染

## Technology Stack

-   [Koa2](https://github.com/koajs/koa)
-   [React](https://github.com/reactjs/reactjs.org)
-   [mysql](https://github.com/mysql/mysql-server)

## Installing Koa-React-SSR

```shell

$ npm install

```

## Getting Started

```shell

$ npm run dev //本地开发环境
$ npm run build //打包prod
$ npm run start //启动项目

```

## pm2 后台永久启动

-   [pm2](https://github.com/Unitech/pm2)

```shell

$ npm run startpm //永久启动服务
$ npm run delpm //杀死全部进程

```

## warning

如果运行报错，有可能是你的 mysql 数据库未安装或者连接密码错误，请核对...

或直接 <font face="黑体" color=Blue>Koa-React-SSR\server\controllers\user.js</font> 进行注释

```js
// import query from './config';

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };

const getUserInfo = async ctx => {
    let data = {};

    // await findUserInfo().then(result => {
    //     data = result[0];
    // });

    data = {
        userId: 1001,
        name: 'xwb007',
        gender: '男',
        age: 24
    };

    ctx.body = data;
};

export default { getUserInfo };
```
