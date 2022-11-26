import { LoggingUtil } from "./../../common/utils/log4js";
import { Request, Response } from "express";
import { UsersDao } from "../dao/UsersDao";
import { SendMail } from "../../Services/EmailService/SendMail";

export class EmailController {
  private static instance: EmailController;

  private constructor() {}

  public static getInstance = () => {
    if (EmailController.instance == null) {
      EmailController.instance = new EmailController();
    }
    return EmailController.instance;
  };

  public async sendMail(req: Request, res: Response): Promise<any> {
    const payload = req.body;
    const result = await SendMail.getInstance().sendMail(
      payload.body,
      payload.subject,
      payload.receiver,
      payload.cc,
      payload.mail
    );

    return result;
  }
}
