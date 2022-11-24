import { Router } from 'express';
import { LoggingUtil } from '../utils/log4js';

export abstract class BaseRouter {
  private  router: Router;
  private port:number;
  ;
  /**
   * Initialize the Router
   */
  constructor() {
        this.router = Router();
        this.init();
  }

  private init():Router {
    this.onInit(this.router);
  }

  public getRouter():Router {
    return this.router;
  }
    
  abstract onInit(router:Router);


}
