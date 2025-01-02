import express,{Request,Response,NextFunction} from 'express'
import {updateProfile,updateservice,GetVandorProfile, Addfood, GetFood, setProfilePic, Vandorlogin } from '../Controllers/VandorController';
import { Authenticate } from '../Middleware/CommonAuth';
import multer from 'multer';
const router = express.Router();

const imageStorgae = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images');
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString+'_'+file.originalname);
    }
})

const images = multer({storage:imageStorgae}).array('images',10);

router.post('/Vandorlogin',Vandorlogin)
router.get('/getProfile',Authenticate,GetVandorProfile);
router.patch('/updateProfile',Authenticate,updateProfile);
router.patch('/updateCoverImage',images,setProfilePic);
router.patch('/updateservice',Authenticate,updateservice);

router.post('/food',images,Addfood);
router.get('/foods',GetFood);

export default router;
