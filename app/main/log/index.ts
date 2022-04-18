import { app } from 'electron';
import moment from 'moment';
import * as path from 'path';
import * as fs from 'fs/promises';
import { TimeFormatEnum } from '../util';

class Log {
  private logFileName: string = `./log${moment().format(
    TimeFormatEnum.dateFormatDate
  )}.txt`;

  public get logFilePath() {
    const appPath = app.getPath('userData');
    return path.join(appPath, this.logFileName);
  }

  public async writeLog(content: string) {
    await fs.appendFile(this.logFilePath, `${JSON.stringify(content)}\n`);
  }
}

export default new Log();
