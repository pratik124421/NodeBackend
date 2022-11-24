import { LoggingUtil } from "./../../common/utils/log4js";
import { Request, Response } from "express";
import { UsersDao } from "../dao/UsersDao";

export class UsersController {
  private static instance: UsersController;

  private constructor() {}

  public static getInstance = () => {
    if (UsersController.instance == null) {
      UsersController.instance = new UsersController();
    }
    return UsersController.instance;
  };

  public async getAllUsers(req: Request, res: Response): Promise<any> {
    let Usersdao = UsersDao.getInstance();
     Usersdao.getAllUsers(req,res).then(result => {
            res.send(result);
        });
  }
  public async loginUser(req: Request, res: Response): Promise<any> {
    let Usersdao = UsersDao.getInstance();
     Usersdao.loginUser(req,res).then(result => {
            res.send(result);
        });
  }
  public async forgotPassword(req: Request, res: Response): Promise<any> {
    let Usersdao = UsersDao.getInstance();
     Usersdao.loginUser(req,res).then(result => {
            res.send(result);
        });
  }

  public async AddUser(req: Request, res: Response): Promise<any> {
    let Usersdao = UsersDao.getInstance();
     Usersdao.AddUser(req,res).then(result => {
            res.send(result);
        });
  }

  public async resetPassword(req: Request, res: Response): Promise<any> {
    let Usersdao = UsersDao.getInstance();
     Usersdao.loginUser(req,res).then(result => {
            res.send(result);
        });
  }
}
