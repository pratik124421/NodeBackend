import { LoggingUtil } from "./../../common/utils/log4js";
import { AdminController } from "./../controller/AdminController";
import { Router } from "express";
import { BaseRouter } from "../../common/web/BaseRouter";
import { UsersRouter } from "./UsersRouter";
import { QrRouter } from "./QrRouter";
import { EmailRouter } from "./EmailRouter";

export class AdminRouter extends BaseRouter {
  private static instance: AdminRouter;

  private controller: AdminController;

  public static getInstance(): Router {
    if (AdminRouter.instance == null) {
      AdminRouter.instance = new AdminRouter();
    }
    return AdminRouter.instance;
  }
  /**
   * Initialize the Router
   */
  constructor() {
    super();
    //this.controller = new AdminController();
  }

  onInit(router: Router) {
    LoggingUtil.log.debug(" action ...");

    router.use("/users", UsersRouter.getInstance());
    router.use("/email", EmailRouter.getInstance());
    router.use("/qr", QrRouter.getInstance());
  }
}
