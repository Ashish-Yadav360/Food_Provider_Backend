import express from 'express'
import { FindRestrauntById, FoodIn30Mins, GetFoodAvailability, SearchFood, TopRestraunt } from '../Controllers/ShoppingController';

const route = express.Router();

//--------------------Food Availability-----------------//
route.get('/:pincode', GetFoodAvailability);
//--------------------Top Restrauntss-----------------//

route.get('/top-restraunt/:pincode',TopRestraunt);

//-------------------Food Available in 30 mins----------------//

route.get('/food-in-30min/:pincode',FoodIn30Mins);


//-----------------Search Foods---------------------//

route.get('/search/:pincode',SearchFood);

//---------------Find Restraunt by Id-------------------//


route.get('/restraunt/:id',FindRestrauntById);


export default route;