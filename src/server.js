'use strict';
/*
* practice Node.js project
*
* @author aloo <aloo@gmail.com>
* */
import ProjectCore from 'project-core'

const $ = global.$ = new ProjectCore();

// ���������ļ�
$.init.add( (done) => {
    $.config.load(path.resolve(__dirname, 'config.js'));
    const env = process.env.NODE_ENV || null;
    if (env){
        $.config.load(path.resolve(__dirname, '../config', env + '.js'));
    }
    $.env = env;
    done();
});

// ��ʼ��MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));
$.init.load(path.resolve(__dirname, 'models'));

// ��ʼ��Express
$.init.load(path.resolve(__ ))

//��ʼ��
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
        nickname: '�����û�'
    });

    item.save(console.log);
})