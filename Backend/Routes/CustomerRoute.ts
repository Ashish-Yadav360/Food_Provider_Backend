import express,{Request,Response,NextFunction} from 'express'
import { getOtp, getCustomerProfile, Customerlogin, Customersignup, updateCustomerProfile, verifyCustomer } from '../Controllers/CustomerController';
import { Authenticate } from '../Middleware/CommonAuth';

const router = express.Router();

router.post('/CustomerSignup', Customersignup);

router.post('/Customerlogin', Customerlogin);

;  
router.patch('/verify',Authenticate,verifyCustomer)

router.get('/otp',Authenticate,getOtp)

router.patch('/updateProfile',Authenticate,updateCustomerProfile)

router.get('/getProfile',Authenticate,getCustomerProfile)

export default router;