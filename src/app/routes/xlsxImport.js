import {
    Router
} from 'express';
import xlsxImportsController from '../controllers/xlsxImports.controller';
import uploadFile from '../../utils/uploadFile'
import jwtValidation from '../../middlewares/jwtValidation'
const router = Router();

router.post('/xlsxImport',jwtValidation.jwtValidation,uploadFile.xlsxImportUploads, xlsxImportsController.xlsxImport);

module.exports = router;