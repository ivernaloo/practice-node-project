'use strict';

import mongoose from 'mongoose';

module.exports = function (done) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var BlogPost = new Schema({
        name: {type: String, unique: true},
        password: {type:String},
        nickname: {type: String}
    });

    $.mongodb.model('User', User);
    $.model.User = $.mongodb.model('User');

    done();
}