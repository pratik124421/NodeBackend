import { config } from "dotenv";

import path = require("path");

export class EnvironmentConfig {
  public static instance: EnvironmentConfig;

  public UserEmail: string;
  public UserEmailPassword: string;
  public Mailbox_SourcePath: string;

  public static getInstance() {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  constructor() {
    const ENV_FILE = path.join(__dirname, "..", ".env");
    config({ path: ENV_FILE });

    this.UserEmail = process.env.Useremail;
    this.UserEmailPassword = process.env.Useremailpassword;
    this.Mailbox_SourcePath = process.env.Mailbox_SourcePath;
  }
}
