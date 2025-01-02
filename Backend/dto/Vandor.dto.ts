export interface CreateVandorInput {
    name: string;
    address: string;
    pincode: string;
    ownername: string;
    foodType: [string];
    phone: string;
    email: string;
    password: string;
  }

  export interface EditVandor{
    address: string;
    name:string;
    foodType:[string];
    phone: string;
    
  }
  
  export interface vandorLoginInput{
     email:string,
     password:string
  }


  export interface VandorPayload{
    _id:string;
    email:string;
    name:string;
    foodType:[string];
  }