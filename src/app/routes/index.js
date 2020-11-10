import {
    Router
} from 'express';
import users from './user';
import xlsxImports from './xlsxImport';

const router = Router();
router.use('/api', users);
router.use('/api', xlsxImports);

module.exports = router;