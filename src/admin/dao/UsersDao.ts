import { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
import { BaseDao } from "../../common/repository/BaseDao";
import { LoggingUtil } from "../../common/utils/log4js";
import {Collection} from "../../common/utils/enum"
import {UserModel} from "../../Models/UserModel"
import {compareSync} from "bcrypt"
var util = require("util");

export class UsersDao extends BaseDao {
  private static UsersDao: UsersDao;
  private static client = null;
  private static url = "";

  public static getInstance(): UsersDao {
    if (UsersDao.UsersDao == null) {
      UsersDao.UsersDao = new UsersDao();
    }

    return UsersDao.UsersDao;
  }

  private constructor() {
    super(Collection.UsersCollection);
  }

  public async getAllUsers(req: any,res:any): Promise<any> {
    let CategiryList = await UsersDao.getInstance().getUsers();
    return CategiryList;
  }

  public async AddUser(req:any,res:any):Promise<any>{
    console.log(req.body)
    let validation = await UsersDao.getInstance().getUser(req.body);
    console.log(":::",validation)
    if(validation){
      return "Email already taken.."
    }else{
      let result = await UsersDao.getInstance().create(req.body);
      return result
    }
  }

  public async loginUser(req: any,res:any): Promise<any> {
    let result = await UsersDao.getInstance().getUser(req.body);
    console.log(compareSync(req.body.Password,result.Password),":::::::::::::")
    if(compareSync(req.body.Password,result.Password)){
      const token = await UsersDao.getInstance().getauthtoken(result);
      console.log("token::",token)
      return {result,token}
    }else{
      return "not authenticated..."      
    }
    
    // res.cookie('jwt',token)
    // , { httpOnly: true, secure: true, maxAge: 3600000 })
  }

  public async forgotPassword(req: any,res:any): Promise<any> {
    let CategiryList = await UsersDao.getInstance().forgotPass(req.body);
    return CategiryList;
  }

  public async resetPassword(req: any,res:any): Promise<any> {
    let CategiryList = await UsersDao.getInstance().resetPass(req.body);
    return CategiryList;
  }

}
