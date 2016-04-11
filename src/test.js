'use strict';


module.exports = function(done){
    $.router.get('/', function(req, res, next){
        res.end('现在是北京时间${new Date()}');
    })
};

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */
/*$.method('user.add').call({
  name: 'hello2',
  email: 'xxxxx@qq.com',
  password: '123456',
  nickname: '测试1',
  about: '好厉害啊',
}, console.log);*/
/*
$.method('user.get').call({
  name: 'hello',
}, console.log);
*/
/*
$.method('user.update').call({
  name: 'hello',
  nickname: '我是老雷',
}, console.log);
*/
