import { MongoConfig } from "./repository/MongoConfig";
import * as jwt  from "jsonwebtoken";
import {Collection} from "./utils/enum"
import {Request} from "express"
import { WebAppConfig } from "./web/WebAppConfig";

export class AuthMiddleware{

    private static instance: AuthMiddleware;

    private constructor() {}
  
    public static getInstance = () => {
      if (AuthMiddleware.instance == null) {
        AuthMiddleware.instance = new AuthMiddleware();
      }
      return AuthMiddleware.instance;
    };

    public async auth(req:Request, res:any, next:any){
        try {
          const token = req.header("Authorization").replace("Bearer ", ""); // getting token from header
          // if(!req.cookies || !req.cookies.jwt){
          //   return res.send("not authenticated...")
          // }
          // const token = req.cookies.jwt
          console.log(`token--->${token}`)
          const decoded = jwt.verify(token,"eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NTE1MTY2MywiaWF0IjoxNjY1MTUxNjYzfQ.Bml-w5JEYQDTpIM8peGEhEyCTUC88ljrg2IHs93p3nE");
          console.log(decoded,"decoded...")
          let db = await WebAppConfig.Modals.get(Collection.UsersCollection);
          let result = await db
            .findOne({ _id: decoded._id})
      
          if (!result) {
            throw new Error();
          }
          
          req.user = result;
          next();
        } catch (err) {
          console.log("Invalide Authentication ",err);
        }
      }
    
}