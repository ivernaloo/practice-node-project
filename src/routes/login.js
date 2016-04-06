'use strict';

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (done) {

  // 检测用户登录与否的api
  $.router.get('/api/login_user', async function (req, res, next) {
    res.apiSuccess({user: req.session.user, token: req.session.logout_token});
  });

  // 登录的路由
  $.router.post('/api/login', async function (req, res, next) {

    if (!req.body.password) return next(new Error('missing password'));

    const user = await $.method('user.get').call(req.body); //这里是等待await的回调
    if (!user) return next(new Error('user does not exists'));

    if (!$.utils.validatePassword(req.body.password, user.password)) {
      return next(new Error('incorrect password'));
    }

    req.session.user = user;
    req.session.logout_token = $.utils.randomString(20);

    res.apiSuccess({token: req.session.logout_token});

  });

  // 退出的路由
  $.router.get('/api/logout', async function (req, res, next) {

    if (req.session.logout_token && req.query.token !== req.session.logout_token) {
      return next(new Error('invalid token'));
    }

    delete req.session.user;
    delete req.session.logout_token;

    res.apiSuccess({});

  });

  // 注册
  $.router.post('/api/signup', async function (req, res, next) {

    const user = await $.method('user.add').call(req.body);

    res.apiSuccess({user: user});

  });


  done();

};
