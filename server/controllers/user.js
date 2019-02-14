import query from './config';

const findUserInfo = () => {
    const _sql = 'select * from user';
    return query(_sql, []);
};

const getUserInfo = async ctx => {
    let data = {};

    await findUserInfo().then(result => {
        data = result[0];
    });

    // data = {
    //     userId: 1002,
    //     name: 'xwb007',
    //     gender: '男',
    //     age: 24
    // };

    ctx.body = data;
};

export default getUserInfo;
