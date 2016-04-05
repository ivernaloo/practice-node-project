'use strict';

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import path from 'path';  // 路径解析
import express from 'express';
import serveStatic from 'serve-static'; //静态服务器
import bodyParser from 'body-parser'; // post body解析
import multipart from 'connect-multiparty'; // 文件解析
import session from 'express-session';  // session管理
import _RedisStore from 'connect-redis'; // redis相关
const RedisStore = _RedisStore(session); // redis session


module.exports = function (done) {

  const debug = $.createDebug('init:express');  // 输出调试信息
  debug('initing Express...');  // 输出启动express

  const app = express();

  app.use(bodyParser.json()); // json解析
  app.use(bodyParser.urlencoded({extended: false})); // value必须是string或者array,true:的时候可以是任意值
  app.use(multipart()); // 上传的文件
  app.use(session({
    secret: $.config.get('web.session.secret'), // session?
    store: new RedisStore($.config.get('web.session.redis')), // store?
  }));

  const router = express.Router(); //route?

  const routerWrap = {};
  ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
    routerWrap[method] = function (path, ...fnList) { // 使用了rest parameters;
      fnList = fnList.map(fn => {
        return function (req, res, next) {
          const ret = fn(req, res, next);
          if (ret && ret.catch) ret.catch(next);
        };
      });
      router[method](path, ...fnList);
    };
  });
  $.router = routerWrap; // 这个变量对应了restful api的所有状态

  app.use(function (req, res, next) {
    res.apiSuccess = function (data) {  // 返回正确的api json数据
      res.json({success: true, result: data});
    };
    next();
  });

  app.use(router);  // router和routerWrap有啥区别, router当中间件传入


  app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

  app.use('/api', function (err, req, res, next) {
    debug('API error: %s', err && err.stack || err);
    res.json({error: err.toString()});
  });

  app.listen($.config.get('web.port'), (err) => { // 监听端口
    done(err);
  });

};
