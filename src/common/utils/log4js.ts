import { configure, getLogger } from "log4js";
const log4jCfg = require('../../../resources/log4j.json');

export class LoggingUtil {
  private static createLog(category?: string) {
    const logger = getLogger(category);
    configure(log4jCfg);
    return logger;
  }
  public static log = LoggingUtil.createLog();
}
