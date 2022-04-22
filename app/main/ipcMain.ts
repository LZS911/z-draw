import { ipcMain } from 'electron';
import log from './log';
import config from './config';
import { AppConfig } from './config/index.type';

export default function initIpcMain() {
  ipcMain.on('writeLog', (_, content: string) => {
    log.writeLog(content);
  });

  ipcMain.on('backupConfigFile', () => {
    config.backupConfigFile();
  });

  ipcMain.on('readConfigFile', async (event) => {
    const configJson = await config.readConfigFile();
    event.sender.send('sendConfigJson', configJson);
  });

  ipcMain.on('writeConfigFile', (_, _config: AppConfig) => {
    config.writeConfigFile(_config);
  });

  ipcMain.on('exchangePrize', (_, id: number) => {
    config.exchangePrize(id);
  });

  ipcMain.on('configFilePath', async (event) => {
    event.sender.send('sendConfigPath', config.configFilePath);
  });
}
