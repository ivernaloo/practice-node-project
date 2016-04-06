'use strict';

/**
 * 
 * 中间件，主要是一些方法函数
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (done) {

  // 检查登录情况
  $.checkLogin = function (req, res, next) {
    //  这样检查session就可以知道登录没有？
    if (!(req.session.user && req.session.user._id)) return next(new Error('please login firstly'));
    // 处理下一个request
    next();

  };


  // async是generator的语法糖，是现在已知最简单的          、
  $.checkTopicAuthor = async function (req, res, next) {

    const topic = await $.method('topic.get').call({_id: req.params.topic_id}); // promise去请求topic_id
    if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

    if (topic.authorId.toString() !== req.session.user._id.toString()) {    //从数据库里查询的id和session里的进行对比。
      return next(new Error('access denied'));
    }

    req.topic = topic;
    next();

  };


  done();

};
