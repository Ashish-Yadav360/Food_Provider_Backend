import express,{Request,Response,NextFunction} from 'express'
import { CreateVandor, GetVandors, GetVandorsbyId } from '../Controllers/AdminController';
const router = express.Router();

router.post('/vandorSignup',CreateVandor);
router.get('/GetVandors',GetVandors);
router.get('/vandor/:id',GetVandorsbyId);

export default router;