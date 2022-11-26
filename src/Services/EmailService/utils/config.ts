import { EnvironmentConfig } from "../../../EnvironmentConfig";

export class Config {
  public static IMAPConfig() {
    return {
      user: EnvironmentConfig.getInstance().UserEmail,
      password: EnvironmentConfig.getInstance().UserEmailPassword,
      host: "imap.outlook.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      keepAlive: { interval: 60000 },
    };
  }
}
