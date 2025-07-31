import { Router } from 'express';
import create from './create';
import read from './read';
import update from './update';
import del from './delete';

const router = Router();

router.use('/create', create);
router.use('/read', read);
router.use('/update', update);
router.use('/delete', del);

export default router;