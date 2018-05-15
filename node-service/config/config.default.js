'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526002905495_3200';

  // add your config here
  config.middleware = ['gzip', 'checkToken'];
  config.gzip = {
    threshold: 1024
  }
  config.checkToken = {
    checkToken: false
  }
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'truechain-vote',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.passportLocal = {
  //   usernameField: 'name',
  //   passwordField: 'pass',
  };
  config.security = {
    // csrf: {
    //   ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    // },
    methodnoallow: {
      enable: false
    },
    // domainWhiteList: [ 'localhost:8080' ]
  };
  exports.cors = {
    origin: '*',
    // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };
  exports.security = {
    csrf: false,
    ctoken: false,
  };
  
  return config;
};