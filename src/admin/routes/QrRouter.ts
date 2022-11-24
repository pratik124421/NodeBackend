import { Router, Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../../common/AuthMiddleware";
import { Collection } from "../../common/utils/enum";
import { WebAppConfig } from "../../common/web/WebAppConfig";
import { QrController } from "../controller/QrController";
// import { QrDao } from "../dao/QrDao";

export class QrRouter {
  private static router: Router;

  public static getInstance(): Router {
    if (QrRouter.router == null) {
      let or = new QrRouter();
      or.init();
    }
    return QrRouter.router;
  }

  private constructor() {
    QrRouter.router = Router();
  }

  public createQr(req: Request, res: Response) {
    let ctrl = QrController.getInstance();
    ctrl.createQr(req, res);
  }
  public readQr(req: Request, res: Response) {
    let ctrl = QrController.getInstance();
    ctrl.readQr(req, res);
  }
  init() {
    QrRouter.router.post("/create",this.createQr);
    QrRouter.router.post("/read", this.readQr);
    }
}
