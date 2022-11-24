import { Router, Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../../common/AuthMiddleware";
import { Collection } from "../../common/utils/enum";
import { WebAppConfig } from "../../common/web/WebAppConfig";
import { UsersController } from "../controller/UsersController";
// import { UsersDao } from "../dao/UsersDao";

export class UsersRouter {
  private static router: Router;

  public static getInstance(): Router {
    if (UsersRouter.router == null) {
      let or = new UsersRouter();
      or.init();
    }
    return UsersRouter.router;
  }

  private constructor() {
    UsersRouter.router = Router();
  }

  public getUsers(req: Request, res: Response) {
    let ctrl = UsersController.getInstance();
    ctrl.getAllUsers(req, res);
  }
  public loginUser(req: Request, res: Response) {
    let ctrl = UsersController.getInstance();
    ctrl.loginUser(req, res);
  }
  public forgotPassword(req: Request, res: Response) {
    let ctrl = UsersController.getInstance();
    ctrl.forgotPassword(req, res);
  }
  public resetPassword(req: Request, res: Response) {
    let ctrl = UsersController.getInstance();
    ctrl.resetPassword(req, res);
  }
  public AddUser(req: Request, res: Response) {
    let ctrl = UsersController.getInstance();
    ctrl.AddUser(req, res);
  }

  init() {
    UsersRouter.router.get("/getUsers",AuthMiddleware.getInstance().auth,this.getUsers);
    UsersRouter.router.post("/login", this.loginUser);
    UsersRouter.router.post("/AddUser", this.AddUser);
    UsersRouter.router.post("/forgotPassword", this.forgotPassword);
    UsersRouter.router.patch("/resetPassword/:token", this.resetPassword);   
  }
}
