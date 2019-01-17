import Router from 'koa-router';
import { getUserInfo } from '../controllers/user';

const router = new Router({ prefix: '/user' });

router.get('/getUserInfo', getUserInfo);

export default router;
