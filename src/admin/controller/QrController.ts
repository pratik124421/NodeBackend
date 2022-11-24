import { LoggingUtil } from "./../../common/utils/log4js";
import { Request, Response } from "express";
import { QrDao } from "../dao/QrDao";

export class QrController {
  private static instance: QrController;

  private constructor() {}

  public static getInstance = () => {
    if (QrController.instance == null) {
      QrController.instance = new QrController();
    }
    return QrController.instance;
  };

  public async createQr(req: Request, res: Response): Promise<any> {
    let Qrdao = QrDao.getInstance();
     Qrdao.createQr(req,res).then(result => {
            res.send(result);
        });
  }
  public async readQr(req: Request, res: Response): Promise<any> {
    let Qrdao = QrDao.getInstance();
     Qrdao.readQr(req,res).then(result => {
            res.send(result);
        });
  }
  
}
