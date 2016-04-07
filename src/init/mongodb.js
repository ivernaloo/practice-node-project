'use strict';

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import mongoose from 'mongoose';  // 连接monogo

module.exports = function (done) {

  const debug = $.createDebug('init:mongodb');
  debug('connecting to MongoDB...');

  const conn = mongoose.createConnection($.config.get('db.mongodb')); //建立了链接
  $.model = {};  $.mongodb = conn;


  const ObjectId = mongoose.Types.ObjectId;
  $.utils.ObjectId = ObjectId;

  done();

}
