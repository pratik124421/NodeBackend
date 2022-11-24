import * as express from 'express';
import * as bodyParser from 'body-parser';
import { LoggingUtil } from '../utils/log4js';
import * as cookieParser from 'cookie-parser'


import { BaseRouter} from './BaseRouter'
import { AdminRouter } from '../../admin/routes/AdminRouter';
import { Model } from 'mongoose';
import { User, UserModel } from '../../Models/UserModel';
import { MongoConfig } from '../repository/MongoConfig';
import { Collection } from '../utils/enum';
import { QrModel } from '../../Models/QrModel';

export class WebAppConfig {

  public static Modals : Map<string,Model<any>>

  private static instance: WebAppConfig;

    constructor(){

    }

    public static getInstance(): WebAppConfig {
      if (WebAppConfig.instance == null) {
        WebAppConfig.instance = new WebAppConfig();
      }
      return WebAppConfig.instance;
    }

    app = express();

    public async initApp() {
        // ==================== Properties initialization ==========
            this.app.use(express.json({ limit: '50mb' }));
            this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
            this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(cookieParser());
            this.app.use(AdminRouter.getInstance().getRouter());

            this.app.listen(3000, () => {
              console.log("service started on 3000")
            });

            await this.initDB()
      }

    public async initDB(){
      await MongoConfig.DBConnection()
      console.log("db connected successfully...")

      WebAppConfig.Modals = new Map<string, Model<any>>();
      WebAppConfig.Modals.set(Collection.UsersCollection, UserModel.GetModal())
      WebAppConfig.Modals.set(Collection.QrCollection, QrModel.GetModal())
      
    }
}