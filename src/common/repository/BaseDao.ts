import { MongoConfig } from "./MongoConfig";
// import { jwt } from "jsonwebtoken";
import { sign, SignOptions } from 'jsonwebtoken';

import { crypto } from "crypto-js";

import { MongoClient, Db } from "mongodb";
import { LoggingUtil } from "../utils/log4js";
import { WebAppConfig } from "../web/WebAppConfig";
var util = require("util");
export class BaseDao {
  constructor(private collection: string) {}

  public async findAll(): Promise<any> {
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db.find().toArray();
      return result;
    } catch (error) {
      console.log(`Fetching records failed!`);
      console.log(error);
      return error;
    }
  }

  public async query(req: any,res:any): Promise<any> {
    let payload = req["payload"]
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      console.log("payload " + JSON.stringify(payload["query"]));
      let result = await db
        .find(payload["query"])
        .toArray();
      console.log("result is here for conve ", result);
      return result;
    } catch (error) {
      console.log(`Fetching records failed!`);
      console.log(error);
      return error;
    }
  }

  public async create(payload:any): Promise<any> {

    let db : any = WebAppConfig.Modals.get(this.collection)
    try {
      console.log("payload::::" + JSON.stringify(payload));
      let result = new db(payload)
      let data = await result.save()
      return result;
    } catch (error) {
      console.log(`Fetching records failed!`);
      console.log(error);
      return error;
    }
  }

  public async add(query: any, data: any): Promise<any> {
    //push()
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .updateOne(query, { $push: data });
      console.log("result for testing : ", result);
      return result;
    } catch (error) {
      console.log(`add record failed!`);
      console.log(error);
      return error;
    }
  }

  public async replace(filter: any, newDocument: any) {
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .replaceOne(filter, newDocument);
      LoggingUtil.log.debug(
        "filter " +
          JSON.stringify(filter) +
          "newDocument" +
          JSON.stringify(newDocument)
      );
      return result;
    } catch (error) {
      console.log("replace record failed..!");
      console.log(error);
      return error;
    }
  }

  public async delete(): Promise<any> {}

  public async getMax(query: any): Promise<any> {
    //getScalar()*
    LoggingUtil.log.debug(query);
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
       .find()
        .sort(query)
        .limit(1)
        .toArray();
      return result[0];
    } catch (error) {}
  }

  public async getMaxFromArray(
    arrayName: any,
    fieldOfArray: any,
    queryData: any
  ): Promise<any> {
    LoggingUtil.log.debug(arrayName + " " + fieldOfArray);
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let query = queryData;
      let result = await db
        .aggregate([
          { $match: query },
          { $unwind: "$" + arrayName },
          { $group: { _id: null, max: { $max: "$" + fieldOfArray } } },
          { $project: { max: 1, _id: 0 } },
        ])
        .toArray();

      return result[0];
    } catch (error) {}
  }

  public async aggregate(payload: any): Promise<any> {
    // LoggingUtil.log.debug(payload['match'] + "---------->" + payload['project'])
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .aggregate(payload)
        .toArray();

      return result;
    } catch (error) {}
  }

  public async distictCount(payload: any): Promise<any> {
    // LoggingUtil.log.debug(payload['match'] + "---------->" + payload['project'])
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db.distinct(payload.query);

      return result;
    } catch (error) {}
  }

  public async updateInArray(query: any, payload: any, filters) {
    LoggingUtil.log.debug(query);
    LoggingUtil.log.debug(payload);
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .updateOne(query, { $set: payload }, { arrayFilters: filters });

      return result;
    } catch (error) {}
  }

  public async update(query: any, payload: any): Promise<any> {
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .updateOne(query, { $set: payload });
      return result;
    } catch (error) {}
  }





  

  public async getUsers(): Promise<any> {
    let db : any =  WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .find()
      return result;
    } catch (error) {
      console.log("error occured in get users Dao..",error);
    }
  }

  
  public async getauthtoken(user: any): Promise<string> {
    const token = sign({ _id: user._id.toString() }, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NTE1MTY2MywiaWF0IjoxNjY1MTUxNjYzfQ.Bml-w5JEYQDTpIM8peGEhEyCTUC88ljrg2IHs93p3nE");  
    try{
      return token;
    }catch(error){
      console.log("error occured in users dao")
    }
  }

  public async createresettoken(user: any): Promise<string> {
    const resettoken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    // console.log({resettoken},user.passwordResetToken)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resettoken;
  }

  public async getUser(payload: any): Promise<any> {
    console.log("db collection...",this.collection)
    let db : any = WebAppConfig.Modals.get(this.collection)
    try {
      console.log("get db object...",db)
      let result = await db
      .findOne(
        {Username:payload.Username}
        )
      console.log(">>>>>",result)
      return result;
    } catch (err) {
      console.log("error occured in login users Dao..");
    }
  }

  public async forgotPass(payload: any): Promise<any> {
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      let result = await db
        .findOne({ Username: payload.Username });
      if (!result) {
        throw new Error("no user found!");
      }
      const resettoken = this.createresettoken(result);
      //   const resettoken = result.createresettoken();
      await result.save({ validateBeforeSave: false });

      // sendResetPasswordEmail(result.name,result.email,`${payload.protocol}://${req.get('host')}/users/resetPassword/${resettoken}`)
      return result;
    } catch (err) {
      console.log("error occured in forgotPassword users Dao..");
    }
  }

  public async resetPass(payload: any): Promise<any> {
    let db : any = await WebAppConfig.Modals.get(this.collection)
    const hashedToken = crypto
      .createHash("sha256")
      .update(payload.params.token)
      .digest("hex");
    try {
      let result = await db.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!result) {
        throw new Error("no user found !");
      }
      result.password = payload.body.password;
      result.passwordResetToken = undefined;
      result.passwordResetExpires = undefined;
      const token = await this.getauthtoken(result);
      //   const token = await result.getauthtoken();
      // await data.save({validateBeforeSave:false})
      return result;
    } catch (err) {
      console.log("error occured in resetPassword users Dao..");
    }
  }

  public async generateQrCode(payload:any){
    let db : any = await WebAppConfig.Modals.get(this.collection)
    try {
      console.log(payload)
      let result = new db({
        Username:payload.name,
        Password:payload.password
      })
      
      //   const resettoken = result.createresettoken();
      await result.save({ validateBeforeSave: false });

      // sendResetPasswordEmail(result.name,result.email,`${payload.protocol}://${req.get('host')}/users/resetPassword/${resettoken}`)
      return result;
    } catch (err) {
      console.log("error occured in forgotPassword users Dao..");
    }
  }
}
