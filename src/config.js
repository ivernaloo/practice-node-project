'use strict';

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (set, get, has) {

  // 服务器监听端口
  set('web.port', 3001);

  // session secret
  set('web.session.secret', 'test'); // session的使用

  // session redis connection
  // 连接redis
  set('web.session.redis', {
    host: '192.168.99.100',
    port: 32768
  });

};
