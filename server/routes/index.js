import Router from 'koa-router';
import getUserInfo from '../controllers/user.js';

const router = new Router({ prefix: '/api' });

router.get('/user/getUserInfo', getUserInfo);

export default router;
