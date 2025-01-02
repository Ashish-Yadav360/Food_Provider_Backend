import {IsEmail, IsEmpty, Length} from 'class-validator';

export class customerInputs{
    firstname:string;
    lastname:string;
    @IsEmail()
    email:string;
    @Length(7,12)
    phone:string;
    @Length(6,12)
    password:string;
}

export class userLoginInput{
    @IsEmail()
    email:string;
    @Length(6,12)
    password:string;
}

export class EditCustomer{
    firstname:string;
    lastname:string;
    address:string;
}

export interface CustomerPayload{
    _id:string;
    email:string;
    verified:boolean;
}