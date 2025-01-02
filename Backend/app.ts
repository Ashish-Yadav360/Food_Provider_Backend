/// <reference path="C:\Users\ashis\OneDrive\Desktop\Food order app\Backend\Middleware\CommonAuth.ts" />

import dotenv from 'dotenv'
import express from "express";
import AdminRoute from './Routes/AdminRoute'
import VanderRoute from './Routes/VendorRoute'
import ShoppingRoute from './Routes/ShoppingRoute'
import CustomerRoute from './Routes/CustomerRoute'
import path from 'path'
import { ConnectMongodb } from './Configs/Connection';
const app = express();
dotenv.config();
app.use(express.json()); 
app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/api',AdminRoute);
app.use('/api',VanderRoute);
app.use('/api',ShoppingRoute);
app.use('/api',CustomerRoute);
// app.use(cookieparser());
app.listen(5000,()=>{
    ConnectMongodb();
    console.log("server is listening at port 5000")
})