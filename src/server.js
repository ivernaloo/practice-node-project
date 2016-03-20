'use strict';
/*
* practice Node.js project
*
* @author aloo <aloo@gmail.com>
* */
import ProjectCore from 'project-core'

const $ = global.$ = new ProjectCore();

// 加载配置文件
$.init.add( (done) => {
    $.config.load(path.resolve(__dirname, 'config.js'));
    const env = process.env.NODE_ENV || null;
    if (env){
        $.config.load(path.resolve(__dirname, '../config', env + '.js'));
    }
    $.env = env;
    done();
});

// 初始化MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));
$.init.load(path.resolve(__dirname, 'models'));

// 初始化Express
$.init.load(path.resolve(__ ))

//初始化
$.init((err) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    } else {
        console.log('inited [env=%s]', $.env);
    }

    const item = new $.model.User({
        name: 'User${$.utils.date('Ymd')}',
        password: '123456',
        nickname: '测试用户'
    });

    item.save(console.log);
})