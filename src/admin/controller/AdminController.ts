import { Request, Response } from 'express';
import { LoggingUtil } from '../../common/utils/log4js';
import { HttpUtil } from '../../common/utils/HttpUtil';


export class AdminController {
    private static instance: AdminController;

    private constructor(){
    }
    
    public static getInstance = () => {
        if (AdminController.instance == null) {
            AdminController.instance = new AdminController();
        }
        return AdminController.instance;
    }

}
