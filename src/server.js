'use strict';

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import path from 'path';  // 路径管理

import ProjectCore from 'project-core';  // 项目核心文件
import createDebug from 'debug';  // 调试库

const $ = global.$ = new ProjectCore();   // project的实例，最关键的是在这儿暴露给了全局


// 创建Debug函数
$.createDebug = function (name) {
  return createDebug('my:' + name); // 输出调式信息
};
const debug = $.createDebug('server'); // server ?


// 加载配置文件
$.init.add((done) => {
  $.config.load(path.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env) {
    debug('load env: %s', env);
    $.config.load(path.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

// 上面都是用project-core做了一层简单的封装，方便调用

// 初始化MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js')); //加载文件
// 加载Models
$.init.load(path.resolve(__dirname, 'models')); //加载models目录

// 加载methods
$.init.load(path.resolve(__dirname, 'methods'));  // 加载methods

// 初始化Express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));
// 初始化中间件
$.init.load(path.resolve(__dirname, 'middlewares'));  //加载中间件目录
// 加载路由
$.init.load(path.resolve(__dirname, 'routes')); //加载routes目录




// 初始化
$.init((err) => {
  if (err) {
    console.error(err);
    process.exit(-1); // 退出当前进程
  } else {
    console.log('inited [env=%s]', $.env);
  }

  require('./test');
});

/*const item = new $.model.User({
  name: 'User$($.utils.date("Ymd")}',
  password: '11121',
  nickname: '测试用户'
});
item.save(console.log);*/
