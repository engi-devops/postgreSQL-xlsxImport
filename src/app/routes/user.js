import {
    Router
} from 'express';
import usersController from '../controllers/users.controller';
import uploadFile from '../../utils/uploadFile'
import jwtValidation from '../../middlewares/jwtValidation'

const router = Router();

router.post('/signup', uploadFile.userUploads ,usersController.signup);
router.post('/login', usersController.login);
router.post('/userUpdate', uploadFile.userUploads, jwtValidation.jwtValidation,  usersController.userUpdate);


module.exports = router;