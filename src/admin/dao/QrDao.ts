import { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
import { BaseDao } from "../../common/repository/BaseDao";
import { LoggingUtil } from "../../common/utils/log4js";
import {Collection} from "../../common/utils/enum"
import {UserModel} from "../../Models/UserModel"
import {compareSync} from "bcrypt"
var util = require("util");

export class QrDao extends BaseDao {
  private static QrDao: QrDao;
  private static client = null;
  private static url = "";

  public static getInstance(): QrDao {
    if (QrDao.QrDao == null) {
      QrDao.QrDao = new QrDao();
    }

    return QrDao.QrDao;
  }

  private constructor() {
    super(Collection.QrCollection);
  }

  public async createQr(req: any,res:any): Promise<any> {
    let CategiryList = await QrDao.getInstance().generateQrCode(req.body);
    return CategiryList;
  }

  public async readQr(req:any,res:any):Promise<any>{
   
  }

  
}
