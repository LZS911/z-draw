import { AppConfig } from '../main/config/index.type';

export interface IIpcRenderer {
  writeLog(content: string): void;
  backupConfigFile(): void;
  readConfigFile(fun: (config: AppConfig) => void): void;
  writeConfigFile(config: AppConfig): void;
}
export interface IElectronAPI {
  ipcRenderer: IIpcRenderer;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
declare module '*.svg' {
  const content: any;
  export default content;
}
