import { Router, Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../../common/AuthMiddleware";
import { Collection } from "../../common/utils/enum";
import { WebAppConfig } from "../../common/web/WebAppConfig";
import { EmailController } from "../controller/EmailController";
import { UsersController } from "../controller/UsersController";
// import { UsersDao } from "../dao/UsersDao";

export class EmailRouter {
  private static router: Router;

  public static getInstance(): Router {
    if (EmailRouter.router == null) {
      let or = new EmailRouter();
      or.init();
    }
    return EmailRouter.router;
  }

  private constructor() {
    EmailRouter.router = Router();
  }

  public async sendMail(req: Request, res: Response) {
    let ctrl = EmailController.getInstance();
    const response = await ctrl.sendMail(req, res);
    console.log("response:: ", response);
    res.send(response);
  }

  init() {
    EmailRouter.router.post("/sendEmail", this.sendMail);
  }
}
