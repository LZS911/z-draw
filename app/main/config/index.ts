import { app } from 'electron';
import path from 'path';
import {
  gifts,
  prizes,
  speed,
  rule,
  ruleBackground,
  footerBackground,
  activeColor,
} from './index.data';
import { AppConfig } from './index.type';
import * as fs from 'fs/promises';
import { isExist } from '../utils/fs';
import moment from 'moment';
import { TimeFormatEnum } from '../util';
import log from '../log';

class Config {
  private configFileName: string = './config_data.json';

  private config: AppConfig;

  constructor() {
    this.config = {
      gifts,
      prizes,
      speed,
      rule,
      ruleBackground,
      footerBackground,
      activeColor,
    };

    this.init();
  }

  public get configFilePath() {
    const appPath = app.getPath('userData');
    return path.join(appPath, this.configFileName);
  }

  public async init() {
    if (!(await isExist(this.configFilePath))) {
      await this.createOrUpdateConfigFile();
    }
    log.writeLog(`当前路径: ${this.configFilePath}`);

    this.config = await this.readConfigFile();
  }

  public async createOrUpdateConfigFile() {
    await fs.writeFile(this.configFilePath, JSON.stringify(this.config));
  }

  public async readConfigFile() {
    const data = await fs.readFile(this.configFilePath, 'utf-8');
    return JSON.parse(data);
  }

  public async backupConfigFile() {
    const appPath = app.getPath('userData');
    const config = await this.readConfigFile();
    const backupFileName = `./config-${moment()
      .format(TimeFormatEnum.dateFormatTime)
      .replace(' ', '-')}.json`;
    log.writeLog(`备份配置文件: ${JSON.stringify(config)}`);
    await fs.writeFile(
      path.join(appPath, backupFileName),
      JSON.stringify(config)
    );
  }

  public async writeConfigFile(config: AppConfig) {
    await fs.writeFile(this.configFilePath, JSON.stringify(config));
  }

  public async exchangePrize(id: number) {
    this.config.prizes.forEach((v) => {
      if (v.id === id) {
        v.count -= 1;
      }
    });
    this.writeConfigFile(this.config);
  }
}

export default new Config();
